import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles, CheckCircle2 } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      {/* Background radial spotlight & grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-tr from-primary/20 via-indigo-500/10 to-violet-400/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-medium mb-6 shadow-xs backdrop-blur-xs animate-in fade-in-50 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>AI-powered project management for software teams</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-6">
          Ship better software, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-primary via-indigo-400 to-violet-500 bg-clip-text text-transparent">
            without the busywork.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Plan projects, manage tasks, collaborate with your team, and turn natural language into structured work — all in one unified workspace.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-7 text-base font-semibold shadow-md shadow-primary/25 gap-2 cursor-pointer"
            >
              <span>Get started free</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <a href="#ai-showcase" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-6 text-base font-medium border-border/80 hover:bg-accent/60 gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-primary fill-primary/20" />
              <span>See how it works</span>
            </Button>
          </a>
        </div>

        {/* Sub-text trust indicators */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/80">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> No credit card required
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Set up in 2 minutes
          </span>
        </div>
      </div>
    </section>
  )
}
