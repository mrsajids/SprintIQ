# SprintIQ — Milestone 6: Task API

Implement **only Milestone 6 — Task API**.

## Current Status

Completed:

* Authentication backend ✅
* Authentication frontend ✅
* Prisma + PostgreSQL ✅
* Workspace API ✅
* Project API ✅

Now implement the **Task API**.

Do not modify working Authentication, Workspace, or Project functionality unless absolutely necessary.

---

# Existing Prisma Task Model

Use the existing model:

```prisma
model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)

  projectId   String
  createdById String
  sprintId    String?

  project     Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdBy   User    @relation(fields: [createdById], references: [id])
  sprint      Sprint? @relation(fields: [sprintId], references: [id], onDelete: SetNull)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([projectId])
  @@index([sprintId])
  @@index([status])
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  IN_REVIEW
  DONE
}
```

**Do not change the Prisma schema.**

---

# 1. Create Task

Add:

```http
POST /projects/:id/tasks
Authorization: Bearer <access_token>
```

Here `:id` is the **project ID**.

Request:

```json
{
  "title": "Create Kanban board",
  "description": "Implement the initial board API"
}
```

Requirements:

* User must be authenticated.
* Verify the project exists.
* Verify the authenticated user has access to the project's workspace.
* Create the task.
* Set:

```text
createdById = req.user.id
```

* Do not accept `createdById` from the request body.
* Default status should be `TODO`.
* Do not handle `sprintId` yet. Sprint assignment belongs to Milestone 7.

Example response:

```json
{
  "id": "task-id",
  "title": "Create Kanban board",
  "description": "Implement the initial board API",
  "status": "TODO",
  "projectId": "project-id",
  "createdById": "user-id"
}
```

---

# 2. Get Project Board

Add:

```http
GET /projects/:id/board
Authorization: Bearer <access_token>
```

Here `:id` is the **project ID**.

Requirements:

* User must be authenticated.
* Verify the project exists.
* Verify the user has access to the project's workspace.
* Fetch all tasks belonging to the project.
* Group tasks by `status`.

Expected response:

```json
{
  "TODO": [
    {
      "id": "task-1",
      "title": "Create API",
      "description": "..."
    }
  ],
  "IN_PROGRESS": [
    {
      "id": "task-2",
      "title": "Build UI"
    }
  ],
  "IN_REVIEW": [],
  "DONE": [
    {
      "id": "task-3",
      "title": "Setup database"
    }
  ]
}
```

Always return all four status columns:

```text
TODO
IN_PROGRESS
IN_REVIEW
DONE
```

Even when a column has no tasks.

For example:

```json
{
  "TODO": [],
  "IN_PROGRESS": [],
  "IN_REVIEW": [],
  "DONE": []
}
```

---

# 3. Update Task

Add:

```http
PATCH /tasks/:id
Authorization: Bearer <access_token>
```

Here `:id` is the **task ID**.

Allow updating:

```text
title
description
status
```

Example:

```json
{
  "status": "IN_PROGRESS"
}
```

or:

```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "DONE"
}
```

Requirements:

* User must be authenticated.
* Verify the task exists.
* Verify the user has access to the task's project workspace.
* Update only fields provided in the request.
* Validate the status against:

```text
TODO
IN_PROGRESS
IN_REVIEW
DONE
```

Do not implement `sprintId` updates yet.

That belongs to Milestone 7.

---

# 4. Task Authorization

Reuse the existing authorization logic from the Workspace/Project milestones.

The authorization chain should effectively be:

```text
authenticate
     ↓
find task/project
     ↓
verify workspace membership
     ↓
perform operation
```

A user must not be able to access a task simply because they know its ID.

For example:

User C is not a member of the workspace.

Even if User C knows:

```text
taskId
projectId
```

these must fail:

```http
GET /projects/:id/board
PATCH /tasks/:id
POST /projects/:id/tasks
```

Return:

```text
403 Forbidden
```

using the project's existing error format.

---

# 5. Validation

### Create Task

```text
title → required
title → must not be empty
description → optional
```

### Update Task

All fields optional, but if supplied:

```text
title → must not be empty
status → valid TaskStatus
```

Use the validation approach already present in the project.

Do not add another validation library.

---

# 6. Follow Existing Architecture

Before coding:

1. Inspect the existing Project module.
2. Follow the same route/controller/service/validation structure.
3. Reuse the existing Prisma client.
4. Reuse existing authentication middleware.
5. Reuse existing workspace membership authorization.
6. Follow the existing API response/error conventions.

Do not introduce a new architecture.

---

# 7. Suggested Structure

Only if this matches the existing project structure:

```text
apps/api/src/

modules/
└── task/
    ├── task.routes.ts
    ├── task.controller.ts
    ├── task.service.ts
    └── task.validation.ts
```

Register the routes in the existing API entry point.

Do not restructure unrelated modules.

---

# 8. Postman Testing

Add/test these endpoints:

```text
POST  /projects/:id/tasks
GET   /projects/:id/board
PATCH /tasks/:id
```

## Test 1 — Create Tasks

Login as a workspace member.

Create several tasks:

```text
Task 1 → TODO
Task 2 → TODO
Task 3 → TODO
```

Expected:

```text
201 Created
```

---

## Test 2 — Get Board

Call:

```http
GET /projects/:id/board
```

Expected:

```json
{
  "TODO": [...],
  "IN_PROGRESS": [],
  "IN_REVIEW": [],
  "DONE": []
}
```

---

## Test 3 — Change Status

Update Task 1:

```http
PATCH /tasks/:id
```

Request:

```json
{
  "status": "IN_PROGRESS"
}
```

Then call:

```http
GET /projects/:id/board
```

Task 1 should now appear under:

```text
IN_PROGRESS
```

and no longer under:

```text
TODO
```

---

## Test 4 — Move Through Board

Update a task:

```text
TODO
 ↓
IN_PROGRESS
 ↓
IN_REVIEW
 ↓
DONE
```

After each update, verify the board reflects the new status.

---

## Test 5 — User Authorization

### User A

Workspace member:

```text
Create task      → allowed
View board       → allowed
Update task      → allowed
```

### User B

Also a workspace member:

```text
Create task      → allowed
View board       → allowed
Update task      → allowed
```

### User C

Not a workspace member:

```text
Create task      → 403
View board       → 403
Update task      → 403
```

---

# 9. Important Scope

Implement **ONLY Task API**.

Do NOT implement:

* Sprint API
* Sprint assignment
* `sprintId` updates
* Kanban frontend
* Drag & drop
* Frontend task UI
* Real-time updates
* WebSockets
* AI
* Notifications

Although `sprintId` already exists in the Prisma schema, **leave it unused for this milestone**.

Milestone 7 will handle sprint assignment.

---

# 10. Database

Do not modify the Prisma schema.

The existing `Task` model already supports everything required for this milestone.

Only create a migration if an actual database change is required. Otherwise, no migration is needed.

---

# Acceptance Criteria

Milestone 6 is complete when:

* [ ] `POST /projects/:id/tasks` creates a task
* [ ] New task defaults to `TODO`
* [ ] `createdById` comes from authenticated user
* [ ] Project existence is validated
* [ ] Workspace membership is verified
* [ ] `GET /projects/:id/board` returns tasks grouped by status
* [ ] All four statuses are always returned
* [ ] `PATCH /tasks/:id` updates task fields
* [ ] Task status can be changed
* [ ] Invalid status is rejected
* [ ] Non-members cannot access project tasks
* [ ] Existing Auth, Workspace, and Project APIs still work
* [ ] Postman tests pass

---

# Completion Report

After implementation, report only:

1. Files created/modified
2. Endpoints added
3. Prisma changes, if any
4. Authorization implemented/reused
5. Postman test results
6. Any issues encountered
