// API client instances, interceptors, and shared request/response types.
// Feature-specific API calls live in features/<feature>/services/ instead.

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
