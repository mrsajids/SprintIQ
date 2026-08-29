import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SprintIQLogoProps {
  className?: string
  iconOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  linkTo?: string
}

export function SprintIQLogo({
  className,
  iconOnly = false,
  size = 'md',
  linkTo = '/',
}: SprintIQLogoProps) {
  const iconSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }

  const textSizeClasses = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-bold',
  }

  const logoContent = (
    <div className={cn('inline-flex items-center gap-2.5 select-none group', className)}>
      {/* Dynamic Sprint Velocity + Intelligence Node Logo Icon */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-primary to-violet-600 text-white shadow-md shadow-primary/20 transition-transform duration-200 group-hover:scale-105',
          iconSizeClasses[size]
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5/8 h-5/8 text-white"
        >
          {/* Fast sprint / intelligent agile path */}
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.25" />
          <circle cx="18" cy="6" r="2" fill="white" stroke="none" />
        </svg>
        {/* Subtle inner highlight */}
        <div className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-inset ring-white/20" />
      </div>

      {!iconOnly && (
        <div className="flex items-center gap-1.5">
          <span className={cn('tracking-tight font-display text-foreground', textSizeClasses[size])}>
            Sprint<span className="text-primary font-black">IQ</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            Dev
          </span>
        </div>
      )}
    </div>
  )

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
