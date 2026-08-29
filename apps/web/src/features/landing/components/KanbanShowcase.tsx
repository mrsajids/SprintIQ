import { useState } from 'react'
import { GitPullRequest, AlertCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface KanbanCard {
  id: string
  title: string
  priority: 'Urgent' | 'High' | 'Medium' | 'Low'
  priorityColor: string
  points: number
  assignee: string
  assigneeInitials: string
  avatarBg: string
  labels: string[]
  pr?: { number: number; status: 'open' | 'merged' | 'review' }
}

const initialColumns: {
  id: string
  title: string
  color: string
  tasks: KanbanCard[]
}[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: 'bg-muted-foreground/30',
    tasks: [
      {
        id: 'SP-112',
        title: 'Zero-downtime database replica failover testing',
        priority: 'Medium',
        priorityColor: 'text-indigo-500 bg-indigo-500/10',
        points: 5,
        assignee: 'Rahul Varma',
        assigneeInitials: 'RV',
        avatarBg: 'bg-indigo-500/20 text-indigo-500',
        labels: ['Infra', 'Database'],
      },
      {
        id: 'SP-114',
        title: 'Design exportable PDF burndown charts for stakeholders',
        priority: 'Low',
        priorityColor: 'text-slate-500 bg-slate-500/10',
        points: 2,
        assignee: 'Elena Rostova',
        assigneeInitials: 'ER',
        avatarBg: 'bg-teal-500/20 text-teal-500',
        labels: ['Analytics', 'UI'],
      },
    ],
  },
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-blue-500',
    tasks: [
      {
        id: 'SP-109',
        title: 'Redis rate-limiting middleware for auth endpoints',
        priority: 'High',
        priorityColor: 'text-amber-500 bg-amber-500/10',
        points: 3,
        assignee: 'Alex Rivera',
        assigneeInitials: 'AR',
        avatarBg: 'bg-primary/20 text-primary',
        labels: ['Security', 'Backend'],
        pr: { number: 218, status: 'open' },
      },
      {
        id: 'SP-110',
        title: 'Implement Dark/Light Mode Tailwind CSS v4 variables',
        priority: 'Medium',
        priorityColor: 'text-indigo-500 bg-indigo-500/10',
        points: 3,
        assignee: 'Sajeed Khan',
        assigneeInitials: 'SK',
        avatarBg: 'bg-violet-500/20 text-violet-500',
        labels: ['Frontend', 'Theme'],
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-indigo-500',
    tasks: [
      {
        id: 'SP-104',
        title: 'GitHub Webhook event handler for PR automated AI review',
        priority: 'Urgent',
        priorityColor: 'text-rose-500 bg-rose-500/10',
        points: 8,
        assignee: 'Sarah Lin',
        assigneeInitials: 'SL',
        avatarBg: 'bg-rose-500/20 text-rose-500',
        labels: ['GitHub', 'Webhooks'],
        pr: { number: 204, status: 'open' },
      },
      {
        id: 'SP-106',
        title: 'Customer OTP Login flow with Twilio Verify API',
        priority: 'High',
        priorityColor: 'text-amber-500 bg-amber-500/10',
        points: 5,
        assignee: 'Rahul Varma',
        assigneeInitials: 'RV',
        avatarBg: 'bg-indigo-500/20 text-indigo-500',
        labels: ['Auth', 'Backend'],
      },
    ],
  },
  {
    id: 'in-review',
    title: 'In Review',
    color: 'bg-amber-500',
    tasks: [
      {
        id: 'SP-98',
        title: 'WebSocket live collaborative cursor & card drag sync',
        priority: 'High',
        priorityColor: 'text-amber-500 bg-amber-500/10',
        points: 5,
        assignee: 'David Lee',
        assigneeInitials: 'DL',
        avatarBg: 'bg-amber-500/20 text-amber-500',
        labels: ['Realtime', 'Sockets'],
        pr: { number: 198, status: 'review' },
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-emerald-500',
    tasks: [
      {
        id: 'SP-91',
        title: 'JWT Refresh Token blacklisting with Redis cluster',
        priority: 'Urgent',
        priorityColor: 'text-rose-500 bg-rose-500/10',
        points: 5,
        assignee: 'Sarah Lin',
        assigneeInitials: 'SL',
        avatarBg: 'bg-rose-500/20 text-rose-500',
        labels: ['Auth', 'Security'],
        pr: { number: 182, status: 'merged' },
      },
      {
        id: 'SP-88',
        title: 'TypeScript monorepo schema sharing between API & Web',
        priority: 'Medium',
        priorityColor: 'text-indigo-500 bg-indigo-500/10',
        points: 3,
        assignee: 'Sajeed Khan',
        assigneeInitials: 'SK',
        avatarBg: 'bg-violet-500/20 text-violet-500',
        labels: ['Architecture'],
        pr: { number: 175, status: 'merged' },
      },
    ],
  },
]

export function KanbanShowcase() {
  const [filter, setFilter] = useState<'all' | 'high' | 'my'>('all')

  return (
    <section id="kanban" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-3">
            <span>Flexible Agile Board</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Your team's work, at a glance.
          </h2>
          <p className="text-base text-muted-foreground mt-2 max-w-xl">
            Keep engineering tasks, sprint velocity, and GitHub PR linkages synced in real time across the team.
          </p>
        </div>

        {/* Board Quick Filters */}
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="text-xs h-8 cursor-pointer"
          >
            All Tasks
          </Button>
          <Button
            variant={filter === 'high' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('high')}
            className="text-xs h-8 gap-1 cursor-pointer"
          >
            <AlertCircle className="w-3 h-3 text-amber-400" /> High Priority
          </Button>
          <Button
            variant={filter === 'my' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('my')}
            className="text-xs h-8 gap-1 cursor-pointer"
          >
            <User className="w-3 h-3 text-primary" /> My PRs
          </Button>
        </div>
      </div>

      {/* 5-Column Kanban Board */}
      <div className="rounded-2xl border border-border bg-card/60 p-4 sm:p-6 shadow-xl overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-w-[960px]">
          {initialColumns.map((col) => {
            const filteredTasks = col.tasks.filter((t) => {
              if (filter === 'high') return t.priority === 'High' || t.priority === 'Urgent'
              if (filter === 'my') return !!t.pr
              return true
            })

            return (
              <div key={col.id} className="flex flex-col rounded-xl bg-background/60 border border-border/70 p-3">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.color}`} />
                    <span className="text-xs font-bold text-foreground">{col.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                    {filteredTasks.length}
                  </span>
                </div>

                {/* Column Tasks */}
                <div className="space-y-3 flex-1">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="group rounded-xl border border-border bg-card p-3 shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer space-y-2.5"
                    >
                      {/* Top row: ID & Priority */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-[10px] text-muted-foreground font-semibold">
                          {task.id}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${task.priorityColor}`}>
                          {task.priority}
                        </span>
                      </div>

                      {/* Title */}
                      <p className="text-xs font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {task.title}
                      </p>

                      {/* Labels */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {task.labels.map((lbl) => (
                          <span
                            key={lbl}
                            className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                          >
                            {lbl}
                          </span>
                        ))}
                      </div>

                      {/* Bottom row: PR, Story points, Assignee */}
                      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
                        {task.pr ? (
                          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${
                            task.pr.status === 'merged'
                              ? 'text-purple-600 dark:text-purple-400'
                              : task.pr.status === 'review'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-emerald-600 dark:text-emerald-400'
                          }`}>
                            <GitPullRequest className="w-3 h-3" /> #{task.pr.number} {task.pr.status}
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {task.points} pts
                          </span>
                        )}

                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] ${task.avatarBg}`}
                          title={task.assignee}
                        >
                          {task.assigneeInitials}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredTasks.length === 0 && (
                    <div className="text-center py-6 text-xs text-muted-foreground border border-dashed border-border rounded-lg">
                      No matching tasks
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
