import { GitBranch, GitPullRequest, GitCommit, Bot, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function GitHubIntegrationSection() {
  const steps = [
    {
      step: '1. Task Link',
      icon: GitCommit,
      title: 'Issue #SP-104',
      subtitle: 'Created in SprintIQ',
      detail: 'Assigned to Sajeed · 5 pts',
    },
    {
      step: '2. Branch',
      icon: GitBranch,
      title: 'feat/auth-otp-verify',
      subtitle: 'Auto-linked to task',
      detail: '3 commits pushed to main',
    },
    {
      step: '3. Pull Request',
      icon: GitPullRequest,
      title: 'PR #204: Add OTP flow',
      subtitle: 'GitHub syncs status',
      detail: '2 reviewers approved',
    },
    {
      step: '4. AI Review',
      icon: Bot,
      title: 'SprintIQ Code Bot',
      subtitle: 'Zero vulnerabilities',
      detail: 'Passed CI in 42s',
    },
    {
      step: '5. Shipped',
      icon: CheckCircle2,
      title: 'Merged & Done',
      subtitle: 'Board auto-updated',
      detail: 'Sprint burndown updated',
    },
  ]

  return (
    <section id="integrations" className="py-20 sm:py-28 bg-[#09090b] text-[#f4f4f5] relative overflow-hidden border-y border-zinc-800">
      {/* Background glowing gradients */}
      <div className="pointer-events-none absolute -top-40 right-10 w-[500px] h-[300px] bg-indigo-500/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-40 left-10 w-[500px] h-[300px] bg-violet-600/10 blur-[130px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-indigo-400 border border-zinc-700 mb-4">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Two-Way GitHub Synchronization</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Where planning meets code.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            Connect your GitHub repositories to keep backlog tasks, pull requests, and automated code review in continuous sync.
          </p>
        </div>

        {/* 5-Step Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {steps.map((s, idx) => {
            const Icon = s.icon
            return (
              <div
                key={s.step}
                className="relative rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 flex flex-col justify-between hover:border-indigo-500/50 hover:bg-zinc-900 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                    <span className="font-semibold">{s.step}</span>
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                    {s.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mb-2">{s.subtitle}</p>
                </div>
                <div className="pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-indigo-300">
                  {s.detail}
                </div>

                {/* Connecting arrow for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-zinc-600">
                    &rarr;
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Realistic GitHub PR Card Preview */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <GitPullRequest className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  feat(auth): implement Twilio OTP verification #204
                </h3>
                <p className="text-xs text-zinc-400">
                  sprintiq-core/auth &middot; opened by <span className="text-zinc-200 font-medium">sajeed-dev</span> &middot; linked to <span className="text-indigo-400 font-medium font-mono">SP-104</span>
                </p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
              Open &middot; CI Passing
            </Badge>
          </div>

          {/* AI Code Review Inline Output */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">SprintIQ Automated Code Review</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Security scan passed
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-mono bg-zinc-950/60 p-3 rounded-lg border border-zinc-800">
              ✓ Verified: Rate-limiting middleware active on /api/v1/auth/otp <br />
              ✓ Verified: Secrets retrieved safely from environment variables <br />
              ✦ Suggestion: Consider caching valid session JWT in Redis for 15 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-zinc-400">
              Supports GitHub Enterprise, GitLab, and Bitbucket out of the box.
            </span>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs gap-1.5"
            >
              <span>Explore GitHub Integrations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
