// Global utility functions shared across the whole app.
// Feature-specific utilities live in features/<feature>/utils/

/**
 * Formats a date to a human-readable string.
 * @example formatDate(new Date()) // "Aug 23, 2026"
 */
export function formatDate(date: Date | string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Returns true if the value is neither null nor undefined.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * Truncates a string to a given length, appending ellipsis if needed.
 */
export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str
}
