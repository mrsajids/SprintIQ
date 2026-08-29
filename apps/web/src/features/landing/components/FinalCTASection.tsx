import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function FinalCTASection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-primary/20 via-indigo-500/10 to-violet-500/5 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Onboarding · Free for Teams</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
          Ready to ship with <br className="hidden sm:inline" />
          less busywork?
        </h2>

        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Bring your projects, engineering team, and development workflow into one intelligent workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 gap-2 cursor-pointer"
            >
              <span>Get started free</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base font-medium border-border hover:bg-accent/60 cursor-pointer"
            >
              <span>Sign in</span>
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Free 14-day full feature trial &middot; No credit card required &middot; Cancel anytime
        </p>
      </div>
    </section>
  )
}
