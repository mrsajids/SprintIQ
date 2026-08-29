/* eslint-disable react-refresh/only-export-components */
import { useMemo } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordStrengthMeterProps {
  password?: string
  showRules?: boolean
  className?: string
}

export interface PasswordRule {
  id: string
  label: string
  met: boolean
}

export function evaluatePassword(password: string = ''): {
  score: number // 0 to 4
  level: 'none' | 'weak' | 'fair' | 'good' | 'strong'
  label: string
  rules: PasswordRule[]
} {
  if (!password) {
    return {
      score: 0,
      level: 'none',
      label: 'Enter a password',
      rules: [
        { id: 'length', label: 'At least 8 characters', met: false },
        { id: 'upper_lower', label: 'Uppercase & lowercase letters', met: false },
        { id: 'number', label: 'At least 1 number', met: false },
        { id: 'symbol', label: 'At least 1 special character', met: false },
      ],
    }
  }

  const rules: PasswordRule[] = [
    { id: 'length', label: 'At least 8 characters', met: password.length >= 8 },
    {
      id: 'upper_lower',
      label: 'Uppercase & lowercase letters',
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    { id: 'number', label: 'At least 1 number', met: /\d/.test(password) },
    {
      id: 'symbol',
      label: 'At least 1 special character',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ]

  const passedCount = rules.filter((r) => r.met).length
  let score = passedCount

  // Bonus for length >= 12
  if (password.length >= 12 && passedCount >= 3) {
    score = Math.min(4, score)
  }

  let level: 'none' | 'weak' | 'fair' | 'good' | 'strong' = 'none'
  let label = 'Too weak'

  if (score === 1) {
    level = 'weak'
    label = 'Weak'
  } else if (score === 2) {
    level = 'fair'
    label = 'Fair'
  } else if (score === 3) {
    level = 'good'
    label = 'Good'
  } else if (score === 4) {
    level = 'strong'
    label = 'Strong'
  }

  return { score, level, label, rules }
}

export function PasswordStrengthMeter({
  password = '',
  showRules = true,
  className,
}: PasswordStrengthMeterProps) {
  const { score, level, label, rules } = useMemo(
    () => evaluatePassword(password),
    [password]
  )

  if (!password) return null

  const getBarColor = (index: number) => {
    if (index >= score) return 'bg-muted dark:bg-muted/40'
    switch (level) {
      case 'weak':
        return 'bg-destructive'
      case 'fair':
        return 'bg-amber-500'
      case 'good':
        return 'bg-indigo-500'
      case 'strong':
        return 'bg-emerald-500'
      default:
        return 'bg-muted'
    }
  }

  const getLabelColor = () => {
    switch (level) {
      case 'weak':
        return 'text-destructive'
      case 'fair':
        return 'text-amber-500'
      case 'good':
        return 'text-indigo-500 dark:text-indigo-400'
      case 'strong':
        return 'text-emerald-600 dark:text-emerald-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className={cn('space-y-2 mt-2 pt-1 animate-in fade-in-50 duration-200', className)}>
      {/* Strength visual bar + label */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium text-[11px]">
          Password strength:
        </span>
        <span className={cn('font-semibold text-[11px] transition-colors', getLabelColor())}>
          {label}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={cn(
              'h-full rounded-full transition-all duration-300',
              getBarColor(idx)
            )}
          />
        ))}
      </div>

      {/* Rules list */}
      {showRules && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1.5 text-[11px]">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={cn(
                'flex items-center gap-1.5 transition-colors',
                rule.met
                  ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                  : 'text-muted-foreground/70'
              )}
            >
              {rule.met ? (
                <Check className="h-3 w-3 shrink-0 stroke-[2.5]" />
              ) : (
                <X className="h-3 w-3 shrink-0 opacity-40" />
              )}
              <span>{rule.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
