import { Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  variant?: 'minimal' | 'segmented'
}

export function ThemeToggle({ className, variant = 'minimal' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 p-1 rounded-lg bg-secondary/80 border border-border text-muted-foreground',
          className
        )}
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all',
            theme === 'light'
              ? 'bg-background text-foreground shadow-xs'
              : 'hover:text-foreground'
          )}
          title="Light Mode"
        >
          <Sun className="h-3.5 w-3.5" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all',
            theme === 'dark'
              ? 'bg-background text-foreground shadow-xs'
              : 'hover:text-foreground'
          )}
          title="Dark Mode"
        >
          <Moon className="h-3.5 w-3.5" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('system')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all',
            theme === 'system'
              ? 'bg-background text-foreground shadow-xs'
              : 'hover:text-foreground'
          )}
          title="System Preference"
        >
          <Laptop className="h-3.5 w-3.5" />
          <span>Auto</span>
        </button>
      </div>
    )
  }

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else setTheme('system')
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      title={`Theme: ${theme} (click to toggle)`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="h-4 w-4 transition-transform rotate-0 scale-100" />
      ) : theme === 'dark' ? (
        <Moon className="h-4 w-4 transition-transform rotate-0 scale-100" />
      ) : (
        <Laptop className="h-4 w-4 transition-transform rotate-0 scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
