// Auth feature — API service (login, logout, register calls).
import { apiFetch } from '@/api'
import type { AuthUser, LoginPayload } from '../types'

export async function login(payload: LoginPayload): Promise<AuthUser> {
  return apiFetch<AuthUser>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function logout(): Promise<void> {
  await apiFetch('/api/auth/logout', { method: 'POST' })
}

export async function getMe(): Promise<AuthUser> {
  return apiFetch<AuthUser>('/api/auth/me')
}
