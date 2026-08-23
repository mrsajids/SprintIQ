// Auth feature — hook.
import { useState } from 'react'
import type { AuthUser } from '../types'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const isAuthenticated = user !== null

  function logout() {
    setUser(null)
  }

  return { user, isAuthenticated, logout, setUser }
}
