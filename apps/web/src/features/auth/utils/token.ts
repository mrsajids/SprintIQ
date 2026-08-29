import type { AuthUser } from '../types'

const ACCESS_TOKEN_KEY = 'sprintiq_access_token'
const REFRESH_TOKEN_KEY = 'sprintiq_refresh_token'
const USER_KEY = 'sprintiq_user'

export function getStoredAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setStoredAccessToken(token: string): void {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  } catch {
    // Ignore storage errors
  }
}

export function getStoredRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setStoredRefreshToken(token: string): void {
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  } catch {
    // Ignore storage errors
  }
}

export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: AuthUser): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    // Ignore storage errors
  }
}

export function saveAuthSession(user: AuthUser, accessToken: string, refreshToken: string): void {
  setStoredUser(user)
  setStoredAccessToken(accessToken)
  setStoredRefreshToken(refreshToken)
}

export function clearAuthSession(): void {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    // Ignore storage errors
  }
}
