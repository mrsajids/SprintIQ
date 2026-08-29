import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Mail, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react'

interface ForgotPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialEmail?: string
}

function ForgotPasswordContent({
  initialEmail = '',
  onClose,
}: {
  initialEmail?: string
  onClose: () => void
}) {
  const [email, setEmail] = useState(initialEmail)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim()) {
      setError('Please enter your work email')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid work email')
      return
    }

    setIsLoading(true)

    // Simulate API request to send reset link
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast.success('Reset Link Sent', {
        description: `We've sent password reset instructions to ${email}`,
      })
    }, 800)
  }

  return (
    <DialogContent>
      {isSuccess ? (
        <div className="text-center py-2 space-y-4 animate-in fade-in-50 zoom-in-95 duration-200">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <DialogTitle className="text-xl font-bold text-center">
              Check your inbox
            </DialogTitle>
            <DialogDescription className="text-center mt-2">
              We've sent a password reset link to <br />
              <span className="font-semibold text-foreground">{email}</span>
            </DialogDescription>
          </div>

          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder or try again in 60 seconds.
          </p>

          <DialogFooter className="sm:justify-center mt-6">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={onClose}
            >
              Back to Sign in
            </Button>
          </DialogFooter>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
              <Mail className="w-5 h-5" />
            </div>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter your work email address and we'll send you a secure link to reset your account password.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5 mb-6">
            <Label htmlFor="reset-email">
              Work email
            </Label>
            <div className="relative flex items-center w-full">
              <Mail className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="reset-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(null)
                }}
                className="pl-9"
                aria-invalid={!!error}
                autoFocus
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-xs text-destructive mt-1 animate-in fade-in-50">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto cursor-pointer"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              <span>Send Reset Link</span>
            </Button>
          </DialogFooter>
        </form>
      )}
    </DialogContent>
  )
}

export function ForgotPasswordDialog({
  open,
  onOpenChange,
  initialEmail = '',
}: ForgotPasswordDialogProps) {
  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ForgotPasswordContent
        key={open ? 'open' : 'closed'}
        initialEmail={initialEmail}
        onClose={() => onOpenChange(false)}
      />
    </Dialog>
  )
}
