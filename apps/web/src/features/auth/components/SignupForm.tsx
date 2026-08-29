import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SprintIQLogo } from '@/components/common/SprintIQLogo'
import { PasswordStrengthMeter, evaluatePassword } from './PasswordStrengthMeter'
import { useAuth } from '@/features/auth'
import { toast } from 'sonner'
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react'

// Official Google 4-Color SVG Icon
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  )
}

export function SignupForm() {
  const navigate = useNavigate()
  const { register } = useAuth()

  // Form Fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Visibility Toggles
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation States (Inline)
  const [nameError, setNameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null)

  // Persistent System Warning (shadcn Alert)
  const [systemAlert, setSystemAlert] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const validateForm = () => {
    let isValid = true
    setNameError(null)
    setEmailError(null)
    setPasswordError(null)
    setConfirmPasswordError(null)
    setSystemAlert(null)

    // Full Name Validation (Inline)
    if (!fullName.trim()) {
      setNameError('Full name is required')
      isValid = false
    } else if (fullName.trim().length < 2) {
      setNameError('Please enter your full name')
      isValid = false
    }

    // Email Validation (Inline)
    if (!email.trim()) {
      setEmailError('Work email is required')
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        setEmailError('Please enter a valid work email')
        isValid = false
      }
    }

    // Password Validation (Inline)
    const strength = evaluatePassword(password)
    if (!password) {
      setPasswordError('Password is required')
      isValid = false
    } else if (strength.score < 2) {
      setPasswordError('Please choose a stronger password')
      isValid = false
    }

    // Confirm Password Validation (Inline)
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password')
      isValid = false
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      isValid = false
    }

    return isValid
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setSystemAlert(null)

    try {
      const res = await register({
        name: fullName.trim(),
        email: email.trim(),
        password,
      })

      toast.success('Account Created Successfully!', {
        description: `Welcome to SprintIQ, ${res.user.name}. Redirecting to your workspace...`,
      })

      setTimeout(() => {
        navigate('/app', { replace: true })
      }, 800)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to register account. Please try again.'

      toast.error('Registration Failed', {
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true)

    setTimeout(() => {
      setIsGoogleLoading(false)
      setSystemAlert('Google OAuth is currently scheduled for the next release. Please register with work email & password.')
      toast.info('Google OAuth Notice', {
        description: 'Please sign up using your work email & password.',
      })
    }, 600)
  }

  const isFormDisabled = isLoading || isGoogleLoading

  return (
    <Card className="border border-border/80 shadow-lg shadow-black/5 dark:shadow-black/30 backdrop-blur-xs">
      <CardHeader className="space-y-3 pb-4 text-center">
        {/* Logo & Product Name */}
        <div className="flex justify-center">
          <SprintIQLogo size="md" linkTo="/" />
        </div>

        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-sm">
            Start building better with your team.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Persistent System Warning (shadcn Alert) */}
        {systemAlert && (
          <Alert variant="warning" className="animate-in fade-in-50 duration-200 text-xs">
            <AlertDescription>{systemAlert}</AlertDescription>
          </Alert>
        )}

        {/* Primary OAuth Action */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full font-medium h-10 border-border/80 hover:bg-accent/60 transition-all gap-2.5 cursor-pointer"
          onClick={handleGoogleSignup}
          disabled={isFormDisabled}
        >
          {isGoogleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          ) : (
            <GoogleIcon className="w-4 h-4" />
          )}
          <span>Continue with Google</span>
        </Button>

        {/* Separator with label */}
        <div className="relative flex py-2 items-center text-xs uppercase">
          <div className="grow border-t border-border" />
          <span className="shrink-0 mx-3 text-muted-foreground font-medium text-[11px] tracking-wider uppercase">
            or sign up with email
          </span>
          <div className="grow border-t border-border" />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignupSubmit} className="space-y-4" noValidate>
          {/* Full Name with Inline Validation */}
          <div className="space-y-1.5">
            <Label htmlFor="signup-name">
              Full name
            </Label>
            <div className="relative flex items-center w-full">
              <User className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="signup-name"
                type="text"
                placeholder="Alex Rivera"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  if (nameError) setNameError(null)
                }}
                className="pl-9"
                aria-invalid={!!nameError}
                autoComplete="name"
                disabled={isFormDisabled}
                autoFocus
              />
            </div>
            {nameError && (
              <p className="text-xs text-destructive mt-1 animate-in fade-in-50">
                {nameError}
              </p>
            )}
          </div>

          {/* Work Email with Inline Validation */}
          <div className="space-y-1.5">
            <Label htmlFor="signup-email">
              Work email
            </Label>
            <div className="relative flex items-center w-full">
              <Mail className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="signup-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError(null)
                }}
                className="pl-9"
                aria-invalid={!!emailError}
                autoComplete="email"
                disabled={isFormDisabled}
              />
            </div>
            {emailError && (
              <p className="text-xs text-destructive mt-1 animate-in fade-in-50">
                {emailError}
              </p>
            )}
          </div>

          {/* Password with Inline Validation & Strength Meter */}
          <div className="space-y-1.5">
            <Label htmlFor="signup-password">
              Password
            </Label>
            <div className="relative flex items-center w-full">
              <Lock className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError(null)
                }}
                className="pl-9 pr-9"
                aria-invalid={!!passwordError}
                autoComplete="new-password"
                disabled={isFormDisabled}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none p-0.5 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {/* Dynamic Password Strength Meter */}
            <PasswordStrengthMeter password={password} />
            {passwordError && (
              <p className="text-xs text-destructive mt-1 animate-in fade-in-50">
                {passwordError}
              </p>
            )}
          </div>

          {/* Confirm Password with Inline Validation */}
          <div className="space-y-1.5">
            <Label htmlFor="signup-confirm-password">
              Confirm password
            </Label>
            <div className="relative flex items-center w-full">
              <Lock className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (confirmPasswordError) setConfirmPasswordError(null)
                }}
                className="pl-9 pr-9"
                aria-invalid={!!confirmPasswordError}
                autoComplete="new-password"
                disabled={isFormDisabled}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none p-0.5 transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-xs text-destructive mt-1 animate-in fade-in-50">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {/* Primary CTA */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-10 text-sm font-semibold tracking-wide shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all mt-2 cursor-pointer"
            disabled={isFormDisabled}
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            <span>Create account</span>
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-border/50 pt-4 pb-4 text-xs text-muted-foreground">
        <span>Already have an account?</span>
        <Link
          to="/login"
          className="ml-1.5 font-semibold text-primary hover:text-primary/80 transition-colors focus:outline-none focus:underline"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  )
}
