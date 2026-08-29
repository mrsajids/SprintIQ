// Auth feature — public API.
// Only import from this file when using auth outside this feature.

export type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
  RefreshResponse,
  ProtectedResponse,
  AuthTokens,
  AuthContextType,
} from './types'

export { AuthProvider, useAuth } from './context/AuthContext'

// API Services
export {
  registerUser,
  loginUser,
  getProtected,
  refreshAccessToken,
  logoutUser,
} from './services'

// Auth UI Components
export { LoginForm } from './components/LoginForm'
export { SignupForm } from './components/SignupForm'
export { AuthLayout } from './components/AuthLayout'
export { ForgotPasswordDialog } from './components/ForgotPasswordDialog'
export { PasswordStrengthMeter, evaluatePassword } from './components/PasswordStrengthMeter'
