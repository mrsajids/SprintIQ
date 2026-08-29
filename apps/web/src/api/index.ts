// API client instances, interceptors, and shared request/response types.
import {
  getStoredAccessToken,
  getStoredRefreshToken,
  setStoredAccessToken,
  clearAuthSession,
} from '@/features/auth/utils/token'

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export interface ApiErrorResponse {
  message?: string
  error?: string
  status?: number
}

export class ApiError extends Error {
  status: number
  data?: ApiErrorResponse

  constructor(status: number, message: string, data?: ApiErrorResponse) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
  retryOn401 = true
): Promise<T> {
  const token = getStoredAccessToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  }

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`

  let response: Response
  try {
    response = await fetch(url, {
      ...init,
      headers,
    })
  } catch (err) {
    throw new ApiError(
      0,
      err instanceof Error ? err.message : 'Network error. Please check your connection.'
    )
  }

  // Handle Token Expiry & Automatic Refresh on 401
  const isAuthEndpoint =
    path.includes('/auth/login') ||
    path.includes('/auth/register') ||
    path.includes('/auth/refresh') ||
    path.includes('/auth/logout')

  if (response.status === 401 && retryOn401 && !isAuthEndpoint) {
    const refreshToken = getStoredRefreshToken()

    if (!refreshToken) {
      clearAuthSession()
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      throw new ApiError(401, 'Session expired. Please sign in again.')
    }

    if (!isRefreshing) {
      isRefreshing = true
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        })

        if (!refreshRes.ok) {
          throw new Error('Refresh failed')
        }

        const data = (await refreshRes.json()) as { accessToken: string }
        setStoredAccessToken(data.accessToken)
        isRefreshing = false
        onRefreshed(data.accessToken)

        // Retry original request with new access token
        return apiFetch<T>(
          path,
          {
            ...init,
            headers: {
              ...headers,
              Authorization: `Bearer ${data.accessToken}`,
            },
          },
          false
        )
      } catch {
        isRefreshing = false
        refreshSubscribers = []
        clearAuthSession()
        window.dispatchEvent(new CustomEvent('auth:unauthorized'))
        throw new ApiError(401, 'Session expired. Please sign in again.')
      }
    } else {
      // If already refreshing, queue this request until refresh completes
      return new Promise<T>((resolve, reject) => {
        refreshSubscribers.push((newToken: string) => {
          apiFetch<T>(
            path,
            {
              ...init,
              headers: {
                ...headers,
                Authorization: `Bearer ${newToken}`,
              },
            },
            false
          )
            .then(resolve)
            .catch(reject)
        })
      })
    }
  }

  // Parse JSON response or extract error
  if (!response.ok) {
    let errorData: ApiErrorResponse | undefined
    let errorMessage = `Request failed with status ${response.status}`

    try {
      errorData = (await response.json()) as ApiErrorResponse
      if (errorData?.message) {
        errorMessage = errorData.message
      }
    } catch {
      // Non-JSON response fallback
    }

    throw new ApiError(response.status, errorMessage, errorData)
  }

  // Handle empty or JSON responses
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>
  }

  return {} as T
}
