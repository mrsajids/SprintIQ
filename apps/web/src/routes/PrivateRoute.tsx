import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth'

/**
 * Wraps protected routes. Redirects to /login if the user is not authenticated.
 * Usage: wrap route elements with <PrivateRoute /> in routes/index.tsx
 */
export function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
