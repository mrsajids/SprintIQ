import { TrendingUp, Clock, CheckCircle2, Sparkles, BarChart3 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function AnalyticsSection() {
  const metrics = [
    {
      title: 'Sprint Velocity',
      value: '48 pts',
      change: '+14% vs avg',
      changePositive: true,
      icon: TrendingUp,
      subtitle: 'Consistent output across past 6 sprints',
    },
    {
      title: 'Cycle Time',
      value: '1.8 days',
      change: '-32% faster',
      changePositive: true,
      icon: Clock,
      subtitle: 'From task started to PR merged in main',
    },
    {
      title: 'Tasks Completed',
      value: '34 / 38',
      change: '89.4% completion',
      changePositive: true,
      icon: CheckCircle2,
      subtitle: 'Sprint 14 ending in 3 days',
    },
    {
      title: 'AI Time Saved',
      value: '18.5 hrs',
      change: '142 AI drafts',
      changePositive: true,
      icon: Sparkles,
      subtitle: 'Manual PM form typing avoided',
    },
  ]

  return (
    <section id="analytics" className="py-20 sm:py-28 bg-muted/20 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Actionable Engineering Insights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Know how your team is really shipping.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Clear, automated metrics derived directly from your Kanban board and GitHub commits. No manual timesheets or guesswork.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <Card key={m.title} className="hover:border-primary/40 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {m.title}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center text-primary">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-extrabold text-foreground pt-2">
                    {m.value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <span className="inline-block text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {m.change}
                  </span>
                  <p className="text-[11px] text-muted-foreground pt-1">{m.subtitle}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Burndown Velocity Chart Visual Container */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Sprint 14 Burndown & Velocity Curve
              </h3>
              <p className="text-xs text-muted-foreground">Ideal guideline vs actual committed story point burns</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-3 h-0.5 bg-muted-foreground inline-block" /> Ideal
              </span>
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-3 h-1 bg-primary rounded-full inline-block" /> Actual Burndown
              </span>
            </div>
          </div>

          {/* Minimal visual burndown graph */}
          <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-l border-border">
            {[
              { day: 'Day 1', ideal: 100, actual: 100 },
              { day: 'Day 2', ideal: 90, actual: 88 },
              { day: 'Day 3', ideal: 80, actual: 75 },
              { day: 'Day 4', ideal: 70, actual: 68 },
              { day: 'Day 5', ideal: 60, actual: 52 },
              { day: 'Day 6', ideal: 50, actual: 44 },
              { day: 'Day 7', ideal: 40, actual: 32 },
              { day: 'Day 8', ideal: 30, actual: 20 },
              { day: 'Day 9', ideal: 20, actual: 12 },
              { day: 'Day 10', ideal: 10, actual: 4 },
            ].map((col, idx) => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full max-w-[28px] bg-primary/20 hover:bg-primary/40 rounded-t transition-all flex flex-col justify-end" style={{ height: `${col.actual}%` }}>
                  <div className="w-full bg-primary rounded-t" style={{ height: `${col.actual * 0.7}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">{idx % 2 === 0 ? col.day : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
