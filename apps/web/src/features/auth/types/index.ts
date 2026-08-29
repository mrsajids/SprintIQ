// Auth feature — TypeScript types matching API specification.

export interface AuthUser {
  id: string
  name: string
  email: string
  createdAt?: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  user: AuthUser
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
}

export interface ProtectedResponse {
  message: string
  userId: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthContextType {
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (payload: LoginPayload) => Promise<LoginResponse>
  register: (payload: RegisterPayload) => Promise<RegisterResponse>
  logout: () => Promise<void>
  testProtected: () => Promise<ProtectedResponse>
  clearError: () => void
}
