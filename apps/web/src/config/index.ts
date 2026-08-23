// App-level configuration derived from environment variables.
// Access env vars only through this file — never import.meta.env directly in components.

export const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  appName: import.meta.env.VITE_APP_NAME ?? 'SprintIQ',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const

export type Config = typeof config
