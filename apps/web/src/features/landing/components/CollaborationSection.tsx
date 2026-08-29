import { FileText, MessageSquare, Users, CheckCircle, Terminal } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function CollaborationSection() {
  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-500 border border-violet-500/20 mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Unified Team Workspace</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          One workspace. One source of truth.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Eliminate context switching between Notion, Jira, Slack, and GitHub. SprintIQ brings documentation, planning, team discussions, and code commits into one live environment.
        </p>
      </div>

      {/* 4-Card Connected Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Collaborative Technical Docs */}
        <Card className="lg:col-span-2 hover:border-primary/40 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Living Technical Docs & PRDs</CardTitle>
                  <p className="text-xs text-muted-foreground">Embed tasks directly in architecture RFCs</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                markdown supported
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs text-foreground space-y-2">
              <div className="flex items-center justify-between text-muted-foreground border-b border-border pb-2 text-[11px]">
                <span>docs/architecture/04-auth-flow.md</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Approved by Tech Lead
                </span>
              </div>
              <p className="text-xs text-foreground font-sans pt-1">
                <strong>## 3. Session & OTP Architecture:</strong> Users request an SMS code via <code className="text-primary font-mono text-xs">/api/v1/auth/otp/send</code>. The generated OTP is stored with a 5-minute TTL in Redis.
              </p>
              <div className="p-2.5 rounded-lg bg-card border border-primary/30 flex items-center justify-between">
                <span className="font-sans text-xs font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Task linked: SP-106 (Implement Customer OTP Login)
                </span>
                <span className="text-[10px] font-bold text-amber-500">In Progress</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Team Discussion Thread */}
        <Card className="hover:border-primary/40 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Contextual Thread</CardTitle>
                <p className="text-xs text-muted-foreground">Discuss on the task directly</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="space-y-2 rounded-xl bg-muted/40 p-3 border border-border">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[9px] font-bold shrink-0">
                  RV
                </div>
                <div>
                  <span className="font-bold text-foreground">Rahul:</span>
                  <p className="text-muted-foreground text-[11px]">Twilio verify webhook is tested on staging. Ready for QA.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1.5 border-t border-border/50">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold shrink-0">
                  SK
                </div>
                <div>
                  <span className="font-bold text-foreground">Sajeed:</span>
                  <p className="text-muted-foreground text-[11px]">Approved PR #204. Great speed on this sprint!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Live Engineering Terminal Activity */}
        <Card className="lg:col-span-3 hover:border-primary/40 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Continuous GitHub & CI/CD Stream</CardTitle>
                  <p className="text-xs text-muted-foreground">Real-time team activity feed</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Stream
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="font-mono">github/push</span>
                  <span>1m ago</span>
                </div>
                <p className="font-semibold text-foreground truncate">alex committed to feat/auth-otp</p>
                <p className="text-[11px] text-muted-foreground font-mono">commit 9c4a8f1 · 4 files changed</p>
              </div>

              <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="font-mono">ci/workflow</span>
                  <span>4m ago</span>
                </div>
                <p className="font-semibold text-foreground truncate">test-suite passed on main</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">48 unit tests · 0 failures</p>
              </div>

              <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="font-mono">sprintiq/ai</span>
                  <span>8m ago</span>
                </div>
                <p className="font-semibold text-foreground truncate">AI generated requirement draft</p>
                <p className="text-[11px] text-primary font-mono">SP-108 · 4 acceptance criteria</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
