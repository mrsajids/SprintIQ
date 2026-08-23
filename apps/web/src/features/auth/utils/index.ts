// Auth feature — utilities.

/** Checks if a JWT token string appears to be expired. */
export function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.')
    const { exp } = JSON.parse(atob(payload)) as { exp: number }
    return Date.now() >= exp * 1000
  } catch {
    return true
  }
}
