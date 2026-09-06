// Auth feature types — imports shared types from @sprintiq/shared-types
import type {
  AuthUser,
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  RefreshResponse,
  ProtectedResponse,
  AuthTokens,
} from '@sprintiq/shared-types'

// Re-export shared types
export type {
  AuthUser,
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  RefreshResponse,
  ProtectedResponse,
  AuthTokens,
}

// Local Auth Context type for React state
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
