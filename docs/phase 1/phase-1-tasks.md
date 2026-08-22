# Phase 1 — Task Breakdown

Goal: Auth + Workspace + Project + Task + Sprint + basic Kanban board. No AI, no real-time yet.

---

## Milestone 1: Setup

- Create folders: `apps/web`, `apps/api`, `packages/shared-types`
- Add `docker-compose.yml` with `postgres` + `redis`
- Run `docker-compose up`, confirm both running
- Build basic Express + TS API with one route: `GET /health`
- Build basic Vite + React + TS app (blank page is fine)

**Checkpoint:** API responds on `/health`, frontend loads in browser.

---

## Milestone 2: Database

- Install Prisma in `apps/api`
- Write schema: `User`, `Workspace`, `WorkspaceMember`, `Project`, `Sprint`, `Task`
- Run migration
- Check tables exist (Prisma Studio)

**Checkpoint:** All 6 tables visible in the database.

---

## Milestone 3: Auth API

- `POST /auth/register` → hash password, save user
- `POST /auth/login` → check password, return access + refresh token
- `POST /auth/refresh` → give new access token
- Auth middleware → checks token on protected routes
- `POST /auth/logout` → delete refresh token

**Checkpoint:** Register + login works via Postman. Protected route blocks without token.

---

## Milestone 4: Workspace API

- `POST /workspaces` → create workspace, creator becomes ADMIN
- `GET /workspaces` → list user's workspaces
- `POST /workspaces/:id/invite` → add existing user by email
- Add middleware: block access if user isn't a workspace member

**Checkpoint:** 2 users — one creates workspace, invites other, both can see it. 3rd user can't.

---

## Milestone 5: Project API

- `POST /projects` → create project in a workspace
- `GET /workspaces/:id/projects` → list projects

**Checkpoint:** Create + list project works via Postman.

---

## Milestone 6: Task API

- `POST /projects/:id/tasks` → create task
- `GET /projects/:id/board` → tasks grouped by status
- `PATCH /tasks/:id` → edit task / change status

**Checkpoint:** Create tasks, see them grouped on `/board`, change status, confirm it updates.

---

## Milestone 7: Sprint API

- `POST /projects/:id/sprints` → create sprint
- `PATCH /sprints/:id` → edit sprint
- `PATCH /tasks/:id` → also accept `sprintId` to assign task to sprint

**Checkpoint:** Create sprint, assign 2-3 tasks to it, confirm.

---

## Milestone 8: Frontend — Login & Workspace

- Login + Register pages
- Store token, auto-refresh on expiry
- Workspace create + switch UI
- Project list + create UI

**Checkpoint:** Full signup → login → create workspace → create project, done through UI.

---

## Milestone 9: Frontend — Kanban Board

- Board page: show columns with tasks (no drag yet)
- Create Task form
- Task detail view (edit fields)
- Add drag-and-drop between columns

**Checkpoint:** Create task, drag across columns, refresh — status stays correct.

---

## Milestone 10: Frontend — Sprint UI

- Sprint create form
- Dropdown to assign task to sprint
- Filter board by sprint

**Checkpoint:** Create sprint, assign tasks, filter board, refresh — everything holds.

---

## Phase 1 Done When:

- [ ] 2 users can sign up + log in
- [ ] One creates workspace, invites other
- [ ] Both can create projects, tasks, move tasks on board
- [ ] Sprint can be created + tasks assigned
- [ ] Refresh keeps everything correct