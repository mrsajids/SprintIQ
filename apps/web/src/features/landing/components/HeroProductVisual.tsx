import { useState } from 'react'
import {
  KanbanSquare,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Calendar,
  Check,
  Bot,
  User,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function HeroProductVisual() {
  const [isDraftAccepted, setIsDraftAccepted] = useState(false)

  return (
    <div id="overview" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      {/* Outer Glow & Window Container */}
      <div className="relative rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/10 dark:shadow-black/60 overflow-hidden ring-1 ring-white/10">
        {/* Window Chrome Titlebar */}
        <div className="h-11 border-b border-border bg-muted/40 px-4 flex items-center justify-between text-xs text-muted-foreground select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-px bg-border mx-1" />
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" /> sprintiq-core / sprint-14
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sprint on track (74% done)
            </span>
            <span>Velocity: 48 pts</span>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Sidebar */}
          <div className="hidden md:flex lg:col-span-2 border-r border-border bg-card/60 p-3 flex-col justify-between text-xs">
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Workspace
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-primary/10 text-primary font-medium">
                <KanbanSquare className="w-4 h-4" />
                <span>Active Board</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>AI Planner</span>
                <span className="ml-auto text-[9px] font-bold px-1 rounded bg-primary/15 text-primary">NEW</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors">
                <GitPullRequest className="w-4 h-4" />
                <span>Pull Requests</span>
                <span className="ml-auto text-[10px] text-muted-foreground">3</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex items-center gap-2 px-2">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-[10px]">
                  SR
                </div>
                <div className="truncate">
                  <p className="text-[11px] font-medium text-foreground">Sajeed (Lead)</p>
                  <p className="text-[9px] text-muted-foreground">Engineering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Kanban Board Snippet */}
          <div className="lg:col-span-6 p-4 border-r border-border bg-background/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Sprint 14 Board</h3>
                  <p className="text-xs text-muted-foreground">12 tasks · 4 in progress · 6 closed</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px]">Filter: High Priority</Badge>
                </div>
              </div>

              {/* Kanban Columns Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* In Progress Column */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      In Progress
                    </span>
                    <span className="text-[11px] text-muted-foreground/70">2</span>
                  </div>

                  {/* Task Card 1 */}
                  <div className="p-3 rounded-lg border border-border bg-card shadow-xs hover:border-primary/40 transition-colors space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">SP-104</Badge>
                      <span className="text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        High
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-snug">
                      Async Redis cache for sprint burndown
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1 text-[10px] text-primary">
                        <GitPullRequest className="w-3 h-3" /> #204
                      </span>
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                        AK
                      </div>
                    </div>
                  </div>

                  {/* Newly accepted task or placeholder */}
                  {isDraftAccepted && (
                    <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/5 shadow-xs space-y-2 animate-in fade-in-50 zoom-in-95 duration-200">
                      <div className="flex items-center justify-between text-[11px]">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">SP-106</Badge>
                        <span className="text-[10px] font-semibold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">
                          High
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground leading-snug">
                        Implement Customer OTP Login
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px] text-muted-foreground">
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                          ✦ Created via AI
                        </span>
                        <div className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-500 flex items-center justify-center text-[10px] font-bold">
                          R
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* In Review Column */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      In Review
                    </span>
                    <span className="text-[11px] text-muted-foreground/70">1</span>
                  </div>

                  <div className="p-3 rounded-lg border border-border bg-card shadow-xs hover:border-primary/40 transition-colors space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">SP-98</Badge>
                      <span className="text-[10px] font-semibold text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                        Medium
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-snug">
                      GitHub Webhook signature verification
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> CI Passed
                      </span>
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-[10px] font-bold">
                        DL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick status bar */}
            <div className="pt-3 mt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> GitHub Sync: Connected
              </span>
              <span>Updated 2m ago</span>
            </div>
          </div>

          {/* Right Live AI Assistant Panel */}
          <div className="lg:col-span-4 p-4 bg-muted/20 flex flex-col justify-between">
            <div className="space-y-3">
              {/* AI Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">SprintIQ Copilot</h4>
                    <p className="text-[10px] text-muted-foreground">Natural Language &rarr; Task Draft</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold text-primary bg-primary/10 border-primary/20">Live Demo</Badge>
              </div>

              {/* Natural Language User Prompt */}
              <div className="rounded-lg bg-background border border-border p-2.5 text-xs text-foreground space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <User className="w-3 h-3 text-primary" /> You prompt:
                </div>
                <p className="italic text-[11px] text-muted-foreground pl-1">
                  "Create a high-priority task for Rahul to implement customer OTP login, due next Friday."
                </p>
              </div>

              {/* Live AI Structured Output */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground text-xs">
                    Implement Customer OTP Login
                  </span>
                  <Badge variant="destructive" className="text-[9px] px-1.5 py-0 font-bold">
                    High
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Assignee</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-violet-500 text-white flex items-center justify-center text-[8px] font-bold">R</span> Rahul
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Due Date</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" /> Aug 14
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-muted-foreground text-[10px] block mb-1">Labels</span>
                  <div className="flex gap-1 flex-wrap">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Backend</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Authentication</span>
                  </div>
                </div>

                {/* AI draft notice */}
                <div className="pt-2 border-t border-primary/20 flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" /> AI draft · Review before creating
                  </span>
                </div>
              </div>
            </div>

            {/* Accept / Interaction Trigger */}
            <div className="pt-3">
              <Button
                size="sm"
                className="w-full text-xs font-semibold gap-1.5 shadow-xs cursor-pointer"
                onClick={() => setIsDraftAccepted(true)}
              >
                {isDraftAccepted ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Added to Sprint 14!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Accept Draft & Add to Sprint</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
