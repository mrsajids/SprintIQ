import React from 'react'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { ShieldCheck, Terminal, Sparkles } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Background decoration: Developer Grid & Ambient Spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Soft ambient lighting top glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-primary/15 via-violet-500/10 to-indigo-400/5 blur-[100px] rounded-full"
        aria-hidden="true"
      />

      {/* Top Bar Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Top minimal status indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted/60 border border-border text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SprintIQ Cloud v1.0</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="minimal" />
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-[440px] animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
          {children}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-3">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> End-to-end Encrypted
          </span>
          <span className="inline-flex items-center gap-1">
            <Terminal className="h-3.5 w-3.5 text-muted-foreground" /> Built for Engineering Teams
          </span>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> AI-Assisted Workflows
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground/70">
          &copy; {new Date().getFullYear()} SprintIQ Inc. All rights reserved. By continuing, you agree to our Terms of Service & Privacy Policy.
        </p>
      </footer>
    </div>
  )
}
