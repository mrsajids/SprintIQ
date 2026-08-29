import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SprintIQLogo } from '@/components/common/SprintIQLogo'
import { ForgotPasswordDialog } from './ForgotPasswordDialog'
import { useAuth } from '@/features/auth'
import { toast } from 'sonner'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'

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

export function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // Validation States (Inline)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Persistent System Warning (shadcn Alert)
  const [systemAlert, setSystemAlert] = useState<string | null>(null)

  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  // Forgot Password Dialog
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  const validateForm = () => {
    let isValid = true
    setEmailError(null)
    setPasswordError(null)
    setSystemAlert(null)

    if (!email.trim()) {
      setEmailError('Email is required')
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        setEmailError('Please enter a valid work email')
        isValid = false
      }
    }

    if (!password) {
      setPasswordError('Password is required')
      isValid = false
    }

    return isValid
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsEmailLoading(true)
    setSystemAlert(null)

    try {
      const res = await login({ email: email.trim(), password })
      toast.success(`Welcome back, ${res.user.name}!`, {
        description: 'Redirecting to your SprintIQ workspace...',
      })

      const fromPath = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/app'
      setTimeout(() => {
        navigate(fromPath, { replace: true })
      }, 600)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Invalid email or password. Please try again.'
      toast.error('Authentication Failed', {
        description: message,
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true)

    setTimeout(() => {
      setIsGoogleLoading(false)
      setSystemAlert('Google OAuth is currently scheduled for the next release. Please use work email & password.')
      toast.info('Google OAuth Notice', {
        description: 'Please sign in using your work email & password.',
      })
    }, 600)
  }

  const isFormDisabled = isEmailLoading || isGoogleLoading

  return (
    <>
      <Card className="border border-border/80 shadow-lg shadow-black/5 dark:shadow-black/30 backdrop-blur-xs">
        <CardHeader className="space-y-3 pb-4 text-center">
          {/* Logo & Product Name */}
          <div className="flex justify-center">
            <SprintIQLogo size="md" linkTo="/" />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm">
              Sign in to continue to your workspace.
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
            onClick={handleGoogleLogin}
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
              or continue with email
            </span>
            <div className="grow border-t border-border" />
          </div>

          {/* Email + Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
            {/* Email Field with Inline Validation */}
            <div className="space-y-1.5">
              <Label htmlFor="login-email">
                Email
              </Label>
              <div className="relative flex items-center w-full">
                <Mail className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="login-email"
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
                  autoFocus
                />
              </div>
              {emailError && (
                <p className="text-xs text-destructive mt-1 animate-in fade-in-50">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Field with Inline Validation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors focus:outline-none focus:underline cursor-pointer"
                  disabled={isFormDisabled}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center w-full">
                <Lock className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (passwordError) setPasswordError(null)
                  }}
                  className="pl-9 pr-9"
                  aria-invalid={!!passwordError}
                  autoComplete="current-password"
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
              {passwordError && (
                <p className="text-xs text-destructive mt-1 animate-in fade-in-50">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2 pt-0.5">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                disabled={isFormDisabled}
              />
              <label
                htmlFor="remember-me"
                className="text-xs text-muted-foreground cursor-pointer select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Primary CTA */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-10 text-sm font-semibold tracking-wide shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer"
              disabled={isFormDisabled}
            >
              {isEmailLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              <span>Sign in</span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-border/50 pt-4 pb-4 text-xs text-muted-foreground">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="ml-1.5 font-semibold text-primary hover:text-primary/80 transition-colors focus:outline-none focus:underline"
          >
            Create account
          </Link>
        </CardFooter>
      </Card>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onOpenChange={setForgotPasswordOpen}
        initialEmail={email}
      />
    </>
  )
}
