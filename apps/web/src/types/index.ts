// Global TypeScript types and interfaces shared across the whole app.
// Feature-specific types live in features/<feature>/types/

export type ID = string | number

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type ApiResponse<T> = {
  data: T
  message?: string
  success: boolean
}

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  total: number
  page: number
  pageSize: number
}
