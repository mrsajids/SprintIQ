// Global app-wide constants.
// Feature-specific constants belong in features/<feature>/constants.ts

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
