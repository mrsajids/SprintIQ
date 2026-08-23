// Auth feature — TypeScript types.

export interface AuthUser {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
