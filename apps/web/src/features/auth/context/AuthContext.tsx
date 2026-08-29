/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type {
  AuthUser,
  AuthContextType,
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
  ProtectedResponse,
} from '../types'
import {
  loginUser,
  registerUser,
  logoutUser,
  getProtected,
} from '../services'
import {
  getStoredAccessToken,
  getStoredRefreshToken,
  getStoredUser,
  saveAuthSession,
  clearAuthSession,
} from '../utils/token'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser())
  const [accessToken, setAccessToken] = useState<string | null>(() => getStoredAccessToken())
  const [refreshToken, setRefreshToken] = useState<string | null>(() => getStoredRefreshToken())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => setError(null), [])

  // Initialize and verify session on load
  useEffect(() => {
    async function initSession() {
      const storedAccess = getStoredAccessToken()
      const storedRefresh = getStoredRefreshToken()
      const storedUser = getStoredUser()

      if (storedAccess && storedUser) {
        setUser(storedUser)
        setAccessToken(storedAccess)
        setRefreshToken(storedRefresh)

        // Try verifying access token with /api/protected
        try {
          await getProtected()
        } catch {
          // apiFetch automatically handles 401 refresh or triggers 'auth:unauthorized'
        }
      } else {
        clearAuthSession()
        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
      }
      setIsLoading(false)
    }

    initSession()

    // Listen for global unauthorized events from apiFetch
    const handleUnauthorized = () => {
      clearAuthSession()
      setUser(null)
      setAccessToken(null)
      setRefreshToken(null)
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)
  }, [])

  // Login handler
  const login = useCallback(async (payload: LoginPayload): Promise<LoginResponse> => {
    setError(null)
    try {
      const res = await loginUser(payload)
      saveAuthSession(res.user, res.accessToken, res.refreshToken)
      setUser(res.user)
      setAccessToken(res.accessToken)
      setRefreshToken(res.refreshToken)
      return res
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please check credentials.'
      setError(message)
      throw err
    }
  }, [])

  // Register handler
  const register = useCallback(async (payload: RegisterPayload): Promise<RegisterResponse> => {
    setError(null)
    try {
      const res = await registerUser(payload)
      // Auto-login after successful registration if desired
      try {
        const loginRes = await loginUser({ email: payload.email, password: payload.password })
        saveAuthSession(loginRes.user, loginRes.accessToken, loginRes.refreshToken)
        setUser(loginRes.user)
        setAccessToken(loginRes.accessToken)
        setRefreshToken(loginRes.refreshToken)
      } catch {
        // Fallback: registration succeeded, user can log in
      }
      return res
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed.'
      setError(message)
      throw err
    }
  }, [])

  // Logout handler
  const logout = useCallback(async (): Promise<void> => {
    const currentRefresh = refreshToken || getStoredRefreshToken()
    if (currentRefresh) {
      try {
        await logoutUser(currentRefresh)
      } catch {
        // Ignore backend logout error if already expired
      }
    }
    clearAuthSession()
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
  }, [refreshToken])

  // Test Protected route helper
  const testProtected = useCallback(async (): Promise<ProtectedResponse> => {
    return getProtected()
  }, [])

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!user && !!accessToken,
    isLoading,
    error,
    login,
    register,
    logout,
    testProtected,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
