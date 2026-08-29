import { useState } from 'react'
import { Sparkles, Check, CheckCircle2, Bot, ArrowRight, CornerDownLeft, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const samplePrompts = [
  {
    id: 'oauth',
    tabLabel: '1. GitHub OAuth Login',
    userPrompt: 'Create a high-priority task to add GitHub OAuth login with validation and error handling.',
    output: {
      title: 'Add GitHub OAuth Login',
      description: 'Implement GitHub OAuth authentication flow using OAuth 2.0 PKCE, session token rotation, and clear toast feedback on failure.',
      priority: 'High',
      priorityColor: 'text-red-500 bg-red-500/10 border-red-500/20',
      assignee: 'Alex Rivera (Frontend)',
      due: 'Friday, Aug 14',
      labels: ['Authentication', 'OAuth', 'Security'],
      criteria: [
        'OAuth redirect and callback flow works seamlessly',
        'Authentication errors and network timeouts handled gracefully',
        'JWT session and refresh token created securely with httpOnly cookies',
        'Invalid or expired credentials redirect back to /login with alert',
      ],
    },
  },
  {
    id: 'db-migration',
    tabLabel: '2. DB Schema Migration',
    userPrompt: 'Create a requirement for Rahul to migrate sprint tasks table to PostgreSQL with audit log triggers by Monday.',
    output: {
      title: 'PostgreSQL Tasks Table & Audit Triggers',
      description: 'Define relational schema for sprint tasks and implement PL/pgSQL triggers to log all state/assignee transitions to audit_logs table.',
      priority: 'Urgent',
      priorityColor: 'text-rose-600 bg-rose-500/10 border-rose-500/20',
      assignee: 'Rahul Varma (Database)',
      due: 'Monday, Aug 17',
      labels: ['Database', 'PostgreSQL', 'Migrations'],
      criteria: [
        'Zero-downtime migration script written with rollback support',
        'Foreign key indexing on workspace_id and sprint_id',
        'Audit trigger logs timestamp, changed_by, old_state, and new_state',
      ],
    },
  },
  {
    id: 'ai-review',
    tabLabel: '3. AI Code Review Bot',
    userPrompt: 'Need a developer task for automated GitHub PR analysis on security vulnerabilities and syntax bottlenecks.',
    output: {
      title: 'Automated GitHub PR AI Code Review Bot',
      description: 'Integrate LLM hook to inspect incoming PR diffs, flag security vulnerabilities, and post concise inline suggestions on GitHub PRs.',
      priority: 'Medium',
      priorityColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      assignee: 'Sarah Lin (DevOps)',
      due: 'Next Sprint',
      labels: ['GitHub', 'AI', 'CI/CD'],
      criteria: [
        'GitHub webhook triggers analysis only on opened/synchronize PR events',
        'Comments are formatted cleanly with markdown code diffs',
        'Includes confidence score and bypass toggle for maintainers',
      ],
    },
  },
]

export function AIFeatureShowcase() {
  const [activeScenario, setActiveScenario] = useState(samplePrompts[0])
  const [isReviewed, setIsReviewed] = useState(false)

  const handleScenarioChange = (scenario: typeof samplePrompts[0]) => {
    setActiveScenario(scenario)
    setIsReviewed(false)
  }

  return (
    <section id="ai" className="py-20 sm:py-28 bg-muted/30 border-y border-border/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-32 left-1/4 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Natural Language Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Stop filling forms. Start describing work.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Tell the AI what needs to happen in plain English. Get a structured draft. Review it. Ship it.
          </p>
        </div>

        {/* Interactive Scenario Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {samplePrompts.map((s) => (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeScenario.id === s.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent/60'
              }`}
            >
              {s.tabLabel}
            </button>
          ))}
        </div>

        {/* Side-by-Side Live Prompt vs AI Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Natural Language Input Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md shadow-black/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-primary" /> Natural Language Prompt
                </span>
                <span className="text-[11px] text-muted-foreground">Plain speech / text dump</span>
              </div>

              {/* Simulated input box */}
              <div className="rounded-xl border border-primary/40 bg-background p-4 shadow-inner">
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  "{activeScenario.userPrompt}"
                </p>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-border text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-[11px]">
                    <CornerDownLeft className="w-3.5 h-3.5 text-primary" /> Press Enter or AI Auto-Parse
                  </span>
                  <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
                    &lt;150ms parse
                  </span>
                </div>
              </div>

              {/* Philosophy Callout */}
              <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>The SprintIQ AI Philosophy</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">AI drafts. You decide.</strong> Priority, assignee, and scope stay human calls. AI pre-fills the structured schema so your team avoids tedious manual data entry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: AI Structured Result Draft */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-primary/40 bg-card p-6 sm:p-8 shadow-xl shadow-primary/5 space-y-6 relative">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-bold bg-primary/10 text-primary border-primary/20">AI Structured Draft</Badge>
                    <span className="text-xs text-muted-foreground">Draft #SP-108</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                    {activeScenario.output.title}
                  </h3>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${activeScenario.output.priorityColor}`}>
                  {activeScenario.output.priority} Priority
                </span>
              </div>

              {/* Fields Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[11px] text-muted-foreground block mb-0.5">Assignee</span>
                  <span className="font-semibold text-foreground">{activeScenario.output.assignee}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground block mb-0.5">Target Due Date</span>
                  <span className="font-semibold text-foreground">{activeScenario.output.due}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-muted-foreground block mb-0.5">Labels</span>
                  <div className="flex gap-1 flex-wrap">
                    {activeScenario.output.labels.map((l) => (
                      <span key={l} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Description
                </span>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/60">
                  {activeScenario.output.description}
                </p>
              </div>

              {/* Acceptance Criteria Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Generated Acceptance Criteria
                </span>
                <div className="space-y-1.5">
                  {activeScenario.output.criteria.map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-foreground bg-card p-2 rounded-md border border-border/70">
                      <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0 stroke-[2.5]" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action footer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
                <span className="text-xs text-muted-foreground italic">
                  ✦ Review draft and click confirm to save directly to Kanban.
                </span>
                <Button
                  onClick={() => setIsReviewed(true)}
                  className="w-full sm:w-auto font-semibold text-xs px-5 shadow-xs cursor-pointer"
                >
                  {isReviewed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 mr-1.5" />
                      <span>Saved & Added to Sprint</span>
                    </>
                  ) : (
                    <>
                      <span>Review & Confirm Draft</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
