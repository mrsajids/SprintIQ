// Auth feature — API service implementations matching Milestone 03 specification.
import { apiFetch } from '@/api'
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  RefreshResponse,
  ProtectedResponse,
} from '../types'

/**
 * 01 - Register a new user
 * POST /api/auth/register
 */
export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim(),
      password: payload.password,
    }),
  })
}

/**
 * 02 - Login user and retrieve access + refresh tokens
 * POST /api/auth/login
 */
export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email.trim(),
      password: payload.password,
    }),
  })
}

/**
 * 04 - Access Protected Route using Bearer Access Token
 * GET /api/protected
 */
export async function getProtected(): Promise<ProtectedResponse> {
  return apiFetch<ProtectedResponse>('/api/protected', {
    method: 'GET',
  })
}

/**
 * 05 - Refresh Access Token using Refresh Token
 * POST /api/auth/refresh
 */
export async function refreshAccessToken(refreshToken: string): Promise<RefreshResponse> {
  return apiFetch<RefreshResponse>('/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  })
}

/**
 * 06 - Logout and invalidate Refresh Token in Redis
 * POST /api/auth/logout
 */
export async function logoutUser(refreshToken: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>('/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  })
}
