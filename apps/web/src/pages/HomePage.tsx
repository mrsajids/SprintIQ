import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { SprintIQLogo } from '@/components/common/SprintIQLogo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  ShieldCheck,
  Lock,
  RefreshCw,
  LogOut,
  Key,
  CheckCircle2,
  Terminal,
  ArrowLeft,
  Loader2,
  KanbanSquare,
} from 'lucide-react'
import { refreshAccessToken } from '@/features/auth/services'
import { setStoredAccessToken } from '@/features/auth/utils/token'

export default function HomePage() {
  const { user, accessToken, refreshToken, logout, testProtected } = useAuth()
  const navigate = useNavigate()

  // Testing States
  const [protectedResult, setProtectedResult] = useState<{ message: string; userId: string } | null>(null)
  const [isTestingProtected, setIsTestingProtected] = useState(false)

  const [refreshSuccess, setRefreshSuccess] = useState<string | null>(null)
  const [isRefreshingToken, setIsRefreshingToken] = useState(false)

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleTestProtected = async () => {
    setIsTestingProtected(true)
    setProtectedResult(null)

    try {
      const res = await testProtected()
      setProtectedResult(res)
      toast.success('Protected Route Authorized', {
        description: `GET /api/protected returned 200 OK for User ID: ${res.userId}`,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Protected route request failed'
      toast.error('Protected Route Error', {
        description: message,
      })
    } finally {
      setIsTestingProtected(false)
    }
  }

  const handleTestRefresh = async () => {
    if (!refreshToken) {
      toast.error('No Refresh Token', {
        description: 'No refresh token was found in the active session.',
      })
      return
    }

    setIsRefreshingToken(true)
    setRefreshSuccess(null)

    try {
      const res = await refreshAccessToken(refreshToken)
      setStoredAccessToken(res.accessToken)
      setRefreshSuccess(`New Access Token: ${res.accessToken.slice(0, 24)}...`)
      toast.success('Token Refreshed Successfully', {
        description: 'A new JWT access token was generated from Redis token store.',
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Token refresh failed'
      toast.error('Token Refresh Failed', {
        description: message,
      })
    } finally {
      setIsRefreshingToken(false)
    }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      toast.info('Logged Out', {
        description: 'Your session has ended and refresh token was removed from Redis.',
      })
      navigate('/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col justify-between">
      {/* Workspace Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <SprintIQLogo size="md" linkTo="/" />
            <span className="hidden sm:inline-block h-4 w-px bg-border" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <KanbanSquare className="w-4 h-4 text-primary" /> Active Workspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-xs font-medium gap-1 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-3.5 h-3.5" /> Landing Page
              </Button>
            </Link>
            <ThemeToggle variant="minimal" />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-xs font-medium gap-1.5 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
            >
              {isLoggingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace Dashboard Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-primary/10 via-indigo-500/5 to-transparent p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>JWT Session Authenticated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Welcome back, {user?.name || 'Developer'}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Connected with work email <strong className="text-foreground">{user?.email}</strong> &middot; User ID <span className="font-mono text-xs text-primary">{user?.id}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs py-1 px-3 bg-card border-border">
              Role: Workspace Owner
            </Badge>
            <Badge variant="outline" className="text-xs py-1 px-3 bg-card border-border">
              Redis Token Store: Active
            </Badge>
          </div>
        </div>

        {/* Milestone 03 Authentication Verification Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Milestone 03 — Live Authentication API Tests
            </h2>
            <span className="text-xs text-muted-foreground font-mono">http://localhost:3000/api</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Protected Route */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    GET /api/protected
                  </span>
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-base font-bold">Protected Route Authorization</CardTitle>
                <CardDescription className="text-xs">
                  Sends HTTP request with <code className="text-primary font-mono text-[11px]">Authorization: Bearer &lt;accessToken&gt;</code>. Verifies JWT validation and user identity retrieval.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {protectedResult && (
                  <Alert className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs animate-in fade-in-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <AlertTitle className="font-semibold text-xs">200 OK — Authorized</AlertTitle>
                      <AlertDescription className="font-mono text-[11px] mt-1 space-y-0.5">
                        <p>message: "{protectedResult.message}"</p>
                        <p>userId: "{protectedResult.userId}"</p>
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                <Button
                  onClick={handleTestProtected}
                  disabled={isTestingProtected}
                  className="w-full text-xs font-semibold gap-2 cursor-pointer shadow-xs"
                >
                  {isTestingProtected ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>Test GET /api/protected</span>
                </Button>
              </CardContent>
            </Card>

            {/* Test Refresh Token */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    POST /api/auth/refresh
                  </span>
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-base font-bold">Token Rotation & Refresh</CardTitle>
                <CardDescription className="text-xs">
                  Sends current <code className="text-primary font-mono text-[11px]">refreshToken</code> to request a new JWT access token from Redis session store.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {refreshSuccess && (
                  <Alert className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs animate-in fade-in-50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <AlertTitle className="font-semibold text-xs">200 OK — Token Refreshed</AlertTitle>
                      <AlertDescription className="font-mono text-[10px] mt-1 break-all">
                        {refreshSuccess}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                <Button
                  variant="outline"
                  onClick={handleTestRefresh}
                  disabled={isRefreshingToken}
                  className="w-full text-xs font-semibold gap-2 cursor-pointer border-border hover:bg-accent/60"
                >
                  {isRefreshingToken ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                  <span>Test POST /api/auth/refresh</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Session Token Inspector */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm font-bold">Active JWT Credentials Inspector</CardTitle>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">localStorage & Memory Synced</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg border border-border bg-muted/40 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                <Key className="w-3.5 h-3.5 text-primary" /> Access Token (15m expiration):
              </div>
              <p className="text-[11px] text-foreground break-all bg-background p-2 rounded border border-border/60">
                {accessToken || 'No access token active'}
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-muted/40 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                <Key className="w-3.5 h-3.5 text-violet-500" /> Refresh Token (7 days Redis TTL):
              </div>
              <p className="text-[11px] text-foreground break-all bg-background p-2 rounded border border-border/60">
                {refreshToken || 'No refresh token active'}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        SprintIQ Cloud &middot; Milestone 03 Authentication Active &middot; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
