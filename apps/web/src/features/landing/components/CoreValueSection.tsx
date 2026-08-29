import { Sparkles, KanbanSquare, GitPullRequest, Users, ArrowUpRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export function CoreValueSection() {
  const values = [
    {
      icon: Sparkles,
      tag: 'AI Planning',
      title: 'Turn words into work',
      description:
        'Describe a requirement or task naturally and let AI parse, categorize, and pre-populate actionable fields in seconds.',
      badgeColor: 'text-primary bg-primary/10 border-primary/20',
      illustration: (
        <div className="rounded-lg bg-muted/50 p-3 font-mono text-[11px] text-muted-foreground border border-border/50">
          <p className="text-primary font-semibold mb-1">prompt &rarr; structured output</p>
          <p className="line-through text-muted-foreground/60 text-[10px]">No more 10-field manual forms</p>
          <p className="text-foreground font-sans font-medium text-xs">AI pre-fills priority, labels & acceptance criteria</p>
        </div>
      ),
    },
    {
      icon: KanbanSquare,
      tag: 'Agile Management',
      title: 'See work clearly',
      description:
        'Manage tasks, priorities, sprints, dependencies, and team velocity from a fast, flexible, keyboard-friendly Kanban board.',
      badgeColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      illustration: (
        <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-muted/50 border border-border/50 text-[10px]">
          <div className="p-1.5 rounded bg-card border border-border font-medium text-muted-foreground text-center">Backlog</div>
          <div className="p-1.5 rounded bg-card border border-primary/40 font-semibold text-primary text-center">In Dev</div>
          <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-center">Done</div>
        </div>
      ),
    },
    {
      icon: GitPullRequest,
      tag: 'Developer Workflow',
      title: 'Connect planning to code',
      description:
        'Keep GitHub branches, commits, PR status, and automated CI test reviews synchronized directly with task progress.',
      badgeColor: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
      illustration: (
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border/50 text-[11px] font-mono">
          <span className="text-foreground">feat/auth-otp</span>
          <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">#204 Merged</span>
        </div>
      ),
    },
    {
      icon: Users,
      tag: 'Team Collaboration',
      title: 'Everything stays connected',
      description:
        'Bring PRDs, engineering notes, sprint retros, team threads, and GitHub activity together into a single source of truth.',
      badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      illustration: (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border/50 text-[10px] text-muted-foreground">
          <div className="flex -space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center font-bold text-[8px] ring-2 ring-background">SR</span>
            <span className="w-5 h-5 rounded-full bg-indigo-500/30 flex items-center justify-center font-bold text-[8px] ring-2 ring-background">AK</span>
            <span className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center font-bold text-[8px] ring-2 ring-background">DL</span>
          </div>
          <span className="text-foreground font-medium">Real-time team sync</span>
        </div>
      ),
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          End-to-End PM & Engineering
        </h2>
        <p className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          From idea to shipped code, in one workspace.
        </p>
        <p className="text-base sm:text-lg text-muted-foreground">
          Built specifically for software teams that value speed, clarity, and automation over manual bureaucracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v) => {
          const Icon = v.icon
          return (
            <Card
              key={v.title}
              className="group hover:border-primary/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${v.badgeColor}`}>
                    {v.tag}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{v.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                  {v.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                {v.illustration}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
