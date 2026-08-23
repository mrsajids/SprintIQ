// Auth feature — public API.
// Only import from this file when using auth outside this feature.
// Internal modules (components, hooks, services) should use relative imports.

export type { AuthUser, LoginPayload } from './types'
export { useAuth } from './hooks/useAuth'
