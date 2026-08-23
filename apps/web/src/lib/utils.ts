import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS class names, handling conflicts intelligently.
 * Used by all shadcn/ui components.
 *
 * @example cn("px-2 py-1", condition && "bg-red-500", "text-sm")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
