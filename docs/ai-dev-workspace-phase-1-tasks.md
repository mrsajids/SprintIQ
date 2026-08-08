# Phase 1 — Task Breakdown (Core Loop)

**Goal:** Auth, Workspace, Project, Task, Sprint, and a basic (non-real-time) Kanban board — end-to-end, persisted, verifiable. No AI, no WebSockets yet — those come in Phase 2 and 3.

Each milestone ends with a manual checkpoint. Don't start the next milestone until the current one's checkpoint passes.

**One scope simplification for Phase 1:** workspace invite = adding an existing user by email, not a full invite-link/pending-invite flow. That's a real feature, but it's not needed to prove the core loop — you can add it later without changing anything else.

---

## Milestone 1 — Project Scaffolding & Local Environment

**1.1 Set up the monorepo structure**
Create three folders: `apps/web` (the React frontend), `apps/api` (the Node backend), and `packages/shared-types` (TypeScript types/interfaces that both the frontend and backend will import — e.g. what a `Task` object looks like — so they never drift out of sync with each other). Set up npm workspaces at the root so all three can share dependencies and reference each other.

**1.2 Write `docker-compose.yml`**
This file tells Docker to run Postgres and Redis as containers on your machine, instead of you installing them directly on your OS. Two services: `postgres` (with a fixed port, username, password, db name) and `redis`. This means your local setup matches what a teammate (or your later AWS deployment) would run, without "works on my machine" problems.

**1.3 Verify the containers**
Run `docker-compose up`, then confirm Postgres is reachable (`psql` or a GUI tool like TablePlus/DBeaver) and Redis is reachable (`redis-cli ping` should return `PONG`). Nothing has been built yet — this step just proves your local environment actually works before you build anything on top of it.

**1.4 Scaffold the API skeleton**
In `apps/api`, set up a basic Express + TypeScript project (package.json, tsconfig, a `src/index.ts` entry file). Add one route, `GET /health`, that just returns `{ status: "ok" }`. This is the smallest possible thing that proves your backend project builds and runs.

**1.5 Scaffold the frontend skeleton**
In `apps/web`, create a Vite + React + TypeScript project (`npm create vite@latest`). Just get it rendering a placeholder page — no real UI yet. This proves your frontend toolchain works before you build any actual screens.

**Checkpoint:** `docker-compose up` runs cleanly, the API responds on `/health`, the frontend dev server loads a blank page in the browser. Nothing functional yet, but the whole toolchain works end to end.

---

## Milestone 2 — Database Schema

**2.1 Install Prisma**
Prisma is an ORM (Object-Relational Mapper) — it lets you describe your database tables as TypeScript-friendly "models" in a schema file, and it generates the actual SQL and a type-safe client for you, so you're not hand-writing raw SQL queries everywhere. Install it in `apps/api` and point its `DATABASE_URL` env variable at the Postgres container from Milestone 1.

**2.2 Write the schema**
Define six models in `schema.prisma`: `User`, `Workspace`, `WorkspaceMember` (the join table linking a user to a workspace with a `role`), `Project`, `Sprint`, and `Task`. This is the exact schema from the technical development plan — copy it in as-is for now, you can extend it in later phases.

**2.3 Run the first migration**
A migration is a versioned, tracked change to your database structure — running `npx prisma migrate dev` reads your schema file and generates the actual SQL to create these tables, and saves that SQL as a file in your repo so the change is repeatable (e.g. when you deploy, or when a teammate pulls your code).

**2.4 Verify the tables exist**
Open Prisma Studio (`npx prisma studio`, a GUI Prisma gives you for free) or connect with `psql` directly, and confirm all six tables exist with the columns you expect.

**Checkpoint:** Tables exist in Postgres, and the migration file is committed to your repo (so the schema is reproducible, not just sitting on your machine).

---

## Milestone 3 — Auth API

**3.1 Register endpoint — `POST /api/v1/auth/register`**
Takes an email + password. You never store the raw password — you hash it first with **bcrypt** (a one-way scrambling function: easy to check "does this password match the hash," effectively impossible to reverse the hash back into the password). Save a new `User` row with the hashed password.

**3.2 Login endpoint — `POST /api/v1/auth/login`**
Verify the submitted password against the stored bcrypt hash. If it matches, issue two tokens: a short-lived **access token** (a JWT, roughly 15 minutes — this is what the frontend sends with every request to prove who it is) and a longer-lived **refresh token** (stored hashed in Redis, used only to get a new access token once the old one expires, without forcing the user to log in again).

**3.3 Refresh endpoint — `POST /api/v1/auth/refresh`**
When the frontend's access token expires, it calls this with the refresh token. The server checks that refresh token against what's stored in Redis — if valid, issues a new access token. This is what lets a user stay logged in for days without re-entering their password, while the access token itself stays short-lived (limiting damage if one ever leaks).

**3.4 Auth middleware**
A piece of code that runs before your protected routes — it reads the access token from the request, verifies it's valid and not expired, and attaches the `userId` to the request object so your route handlers know who's calling. Every route except register/login/refresh will use this.

**3.5 Logout endpoint — `POST /api/v1/auth/logout`**
Deletes the refresh token from Redis. This is what makes logout actually mean something — without this, a stolen refresh token would keep working even after the user "logs out" on their end.

**Checkpoint:** Using a REST client (Postman/Thunder Client) — register a user, log in, call a dummy protected route with the access token and confirm it works, then call it without a token and confirm you get a 401.

---

## Milestone 4 — Workspace API

**4.1 Create workspace — `POST /api/v1/workspaces`**
Creates a `Workspace` row, and automatically creates a `WorkspaceMember` row linking the creator to it with role `ADMIN`. A workspace should never exist with zero members — the creator is always the first one.

**4.2 List workspaces — `GET /api/v1/workspaces`**
Returns every workspace the logged-in user (from the auth middleware's `userId`) is a member of.

**4.3 Invite endpoint — `POST /api/v1/workspaces/:id/invite`**
Takes an email. If a `User` with that email already exists, create a `WorkspaceMember` row for them with whatever role you specify. If no such user exists yet, return a 404 for now — a proper "invite someone who doesn't have an account yet" flow is a nice-to-have for later, not a Phase 1 requirement.

**4.4 `requireWorkspaceMember` middleware**
This is the important one: a reusable check that every workspace-scoped route below this point will use. It confirms the logged-in user is actually a member of the `workspaceId` in the request before letting the request through. This is what prevents **tenant leakage** — one workspace's data accidentally becoming visible to a user from a different workspace. Get this right now; every future module depends on it.

**Checkpoint:** Register two users. First one creates a workspace and invites the second by email. Both now see the workspace in their `GET /workspaces` response. A third, uninvited user does not — and if they try to hit any workspace-scoped route directly, they get rejected.

---

## Milestone 5 — Project API

**5.1 Create project — `POST /api/v1/projects`**
Creates a `Project` under a given workspace. Uses the `requireWorkspaceMember` middleware from Milestone 4, so only members of that workspace can create projects in it.

**5.2 List projects — `GET /api/v1/workspaces/:id/projects`**
Returns all projects belonging to a workspace, again gated by workspace membership.

**Checkpoint:** Create a project inside the workspace from Milestone 4's checkpoint, confirm it shows up in the list, and confirm a user who isn't a member of that workspace gets a 403 if they try.

---

## Milestone 6 — Task API

**6.1 Create task — `POST /api/v1/projects/:id/tasks`**
Creates a `Task` under a project. Only `title` is required; everything else (description, priority, assignee, due date, story points) is optional at creation — this mirrors how a real Kanban card starts out sparse and gets filled in over time.

**6.2 Board endpoint — `GET /api/v1/projects/:id/board`**
Returns all of a project's tasks, grouped by `status` (Backlog / To Do / In Progress / In Review / Done). This is the single API call your Kanban UI will use to render the whole board — the frontend doesn't need to know how the grouping works, the backend hands it back pre-organized.

**6.3 Edit task — `PATCH /api/v1/tasks/:id`**
Lets you update any field on a task — including `status`. This one endpoint is what "dragging a card to a new column" will call later: the frontend just sends `{ status: "IN_PROGRESS" }` and the card has moved.

**Checkpoint:** Create a few tasks via the API with different statuses, confirm `/board` groups them correctly by column, then `PATCH` one task's status and confirm `/board` reflects the change.

---

## Milestone 7 — Sprint API

**7.1 Create sprint — `POST /api/v1/projects/:id/sprints`**
Creates a `Sprint` with a goal, start date, and end date, under a project.

**7.2 Edit sprint — `PATCH /api/v1/sprints/:id`**
Lets you update sprint details (dates, goal) after creation.

**7.3 Assign a task to a sprint**
Extend the existing `PATCH /tasks/:id` from Milestone 6 to also accept a `sprintId` field. This is how a task gets pulled into (or out of) a sprint — no separate endpoint needed, it's just another field on the same update call.

**Checkpoint:** Create a sprint, assign 2–3 existing tasks to it via `PATCH`, then confirm (via `/board` or a sprint-specific query) that those tasks show the correct sprint.

---

## Milestone 8 — Frontend: Auth & Workspace Shell

**8.1 Login and Register pages**
Two forms, wired to the `/auth/register` and `/auth/login` endpoints from Milestone 3. On success, store the access token (in memory/React state is fine) and handle the refresh token according to whatever storage approach you pick (e.g. an httpOnly cookie set by the server) — just make sure you actually decide this rather than leaving it unset.

**8.2 API wrapper with auto-refresh**
A small wrapper around `fetch`/axios that automatically attaches the access token to every request, and — if a request comes back 401 (token expired) — calls `/auth/refresh` once, gets a new access token, and retries the original request. This means the rest of your frontend code never has to think about token expiry.

**8.3 Workspace creation UI + switcher**
A form to create a new workspace, and (if the user belongs to more than one) a way to switch between them — this could be as simple as a dropdown in the header for now.

**8.4 Project list + create**
Inside a selected workspace, show its projects and a form to create a new one.

**Checkpoint:** From a completely fresh browser session — register, log in, create a workspace, create a project — all through the UI, with zero direct API calls from you.

---

## Milestone 9 — Frontend: Kanban Board

**9.1 Board view (no drag-and-drop yet)**
Fetch `/board` and render the columns with their tasks as a plain list first. Deliberately skip drag-and-drop at this stage — get the data flowing and rendering correctly before adding interaction complexity on top.

**9.2 Create Task form**
A manual form (Title, Description, Priority, Assignee, Due Date, etc.) wired to `POST /tasks`. This is the plain form — the AI-assisted "type a sentence and it fills this in" version is Phase 2, don't build that yet.

**9.3 Task detail view**
Clicking a card opens a view showing/editing all its fields, wired to `PATCH /tasks/:id`.

**9.4 Drag-and-drop**
Add `@dnd-kit` to let cards be dragged between columns. On drop, call `PATCH /tasks/:id` with the new status — this reuses the exact same endpoint from Milestone 6, drag-and-drop is just a UI gesture that triggers the update you already built.

**Checkpoint:** Create a task through the UI, drag it across a couple of columns, refresh the browser, and confirm its final column (status) persisted correctly.

---

## Milestone 10 — Frontend: Sprint UI

**10.1 Sprint creation form**
Same pattern as project creation — a form wired to `POST /sprints`.

**10.2 Assign a task to a sprint**
A dropdown on the task detail view (from 9.3) to pick a sprint — no need for a dedicated drag-based sprint-planning screen yet, that's a later nice-to-have, not Phase 1.

**10.3 Sprint filter on the board**
A toggle/dropdown on the board view to show only the current sprint's tasks.

**Checkpoint:** Create a sprint, assign a few tasks to it, filter the board down to just that sprint, refresh, and confirm both the filter and the assignments held.

---

## Phase 1 Exit Checkpoint

This is the one that actually matters — don't move to Phase 2 (AI) until every one of these is true in a single continuous walkthrough through the UI, with no direct API calls:

- [ ] Two separate users can register and log in
- [ ] One creates a workspace and invites the other
- [ ] Both can see the workspace, create projects, create tasks, and move tasks across the board
- [ ] A sprint can be created and tasks assigned to it
- [ ] A hard refresh at any point shows correctly persisted state
