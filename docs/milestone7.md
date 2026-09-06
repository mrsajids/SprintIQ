# SprintIQ — Milestone 7: Sprint API

Implement **only Milestone 7 — Sprint API + Task Sprint Assignment**.

## Current Status

Completed:

* Authentication API ✅
* Authentication frontend ✅
* Workspace API ✅
* Project API ✅
* Task API ✅
* Task board API ✅

Now implement Sprint functionality.

Do not modify working Authentication, Workspace, Project, or Task functionality unless absolutely necessary.

---

# Existing Prisma Schema

The required Sprint relationship already exists:

```prisma
enum SprintStatus {
  PLANNED
  ACTIVE
  COMPLETED
}

model Sprint {
  id          String       @id @default(cuid())
  name        String
  goal        String?
  status      SprintStatus @default(PLANNED)

  startDate   DateTime?
  endDate     DateTime?

  projectId   String

  project     Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  tasks       Task[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([projectId])
}

model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)

  projectId   String
  createdById String
  sprintId    String?

  project     Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdBy   User       @relation(fields: [createdById], references: [id])
  sprint      Sprint?    @relation(fields: [sprintId], references: [id], onDelete: SetNull)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Do not modify the Prisma schema.**

---

# 1. Create Sprint

Add:

```http
POST /projects/:id/sprints
Authorization: Bearer <access_token>
```

Here `:id` is the project ID.

Request:

```json
{
  "name": "Sprint 1",
  "goal": "Complete authentication and workspace functionality",
  "startDate": "2026-09-07T00:00:00.000Z",
  "endDate": "2026-09-20T23:59:59.999Z"
}
```

### Requirements

* User must be authenticated.
* Verify the project exists.
* Verify the user is a member of the project's workspace.
* Validate the request.
* Create the sprint under the project.
* Default `status` to `PLANNED`.
* Do not accept `projectId` from the request body.
* Do not accept `createdById` because Sprint does not have that field.

The project ID comes from:

```text
req.params.id
```

---

# 2. Update Sprint

Add:

```http
PATCH /sprints/:id
Authorization: Bearer <access_token>
```

Here `:id` is the sprint ID.

Allow updating:

```text
name
goal
status
startDate
endDate
```

Example:

```json
{
  "status": "ACTIVE"
}
```

Another example:

```json
{
  "name": "Sprint 1 — Core Platform",
  "goal": "Finish core platform APIs"
}
```

### Requirements

* User must be authenticated.
* Verify the sprint exists.
* Find its project.
* Verify the authenticated user is a member of the project's workspace.
* Update only fields supplied in the request.
* Validate `status`.

Valid statuses:

```text
PLANNED
ACTIVE
COMPLETED
```

---

# 3. Assign Task to Sprint

Update the existing:

```http
PATCH /tasks/:id
Authorization: Bearer <access_token>
```

from Milestone 6.

It must now additionally accept:

```json
{
  "sprintId": "sprint-id"
}
```

Example:

```http
PATCH /tasks/task-id
```

```json
{
  "sprintId": "sprint-id"
}
```

### Requirements

* User must be authenticated.
* Verify the task exists.
* Verify the task's project.
* Verify the user is a member of the project's workspace.
* Verify the sprint exists.
* Verify the sprint belongs to the **same project as the task**.
* Only then assign the sprint.

This validation is important.

A task from:

```text
Project A
```

must not be assignable to a sprint from:

```text
Project B
```

---

# 4. Remove Task From Sprint

The same endpoint should support removing a task from a sprint.

Request:

```json
{
  "sprintId": null
}
```

Expected behavior:

```text
Task
  ↓
sprintId = null
```

The task becomes unassigned from the sprint.

Do not create a separate endpoint for this.

---

# 5. Sprint Authorization

Reuse the authorization approach from previous milestones.

The effective flow should be:

```text
authenticate
      ↓
find project/workspace
      ↓
verify workspace membership
      ↓
perform operation
```

Do not duplicate authorization logic unnecessarily.

A non-member must not be able to:

```text
Create sprint
Update sprint
Assign task to sprint
Remove task from sprint
```

Expected:

```text
403 Forbidden
```

Follow the existing API error format.

---

# 6. Sprint Validation

### Create Sprint

Required:

```text
name
```

Optional:

```text
goal
startDate
endDate
```

Default:

```text
status = PLANNED
```

### Update Sprint

All fields are optional.

If supplied:

```text
name → non-empty
status → PLANNED | ACTIVE | COMPLETED
startDate → valid date
endDate → valid date
```

If both dates are provided, reject an invalid range where:

```text
endDate < startDate
```

Use the project's existing validation approach.

Do not add a new validation library.

---

# 7. Task Validation

Extend the existing Task update validation.

Current supported fields:

```text
title
description
status
```

Add:

```text
sprintId
```

Allowed values:

```text
valid Sprint ID
null
```

Do not change existing task behavior.

---

# 8. Follow Existing Architecture

Before implementing:

1. Inspect the existing Task module.
2. Inspect the existing Project module.
3. Follow the same:

   * route structure
   * controller/service pattern
   * validation
   * error handling
   * Prisma client usage
   * response format

Do not introduce a new architecture.

Suggested structure only if consistent with the current project:

```text
apps/api/src/

modules/
├── sprint/
│   ├── sprint.routes.ts
│   ├── sprint.controller.ts
│   ├── sprint.service.ts
│   └── sprint.validation.ts
│
└── task/
    └── existing files
```

Do not restructure unrelated modules.

---

# 9. No Prisma Migration

The existing Prisma schema already supports:

```text
Sprint
Task.sprintId
```

Therefore:

**Do not modify the Prisma schema or create a migration.**

Only generate/update Prisma client if required by the existing setup.

---

# 10. Postman Testing

Add/test:

```text
POST  /projects/:id/sprints
PATCH /sprints/:id
PATCH /tasks/:id
```

---

## Test 1 — Create Sprint

Use a project the authenticated user can access.

Request:

```json
{
  "name": "Sprint 1",
  "goal": "Complete core platform",
  "status": "PLANNED"
}
```

Expected:

```text
201 Created
```

Sprint should belong to the selected project.

---

## Test 2 — Update Sprint

Call:

```http
PATCH /sprints/:id
```

Request:

```json
{
  "status": "ACTIVE"
}
```

Expected:

```text
200 OK
```

Then update:

```json
{
  "name": "Sprint 1 Updated",
  "goal": "Updated sprint goal"
}
```

Verify the changes persist.

---

## Test 3 — Assign Task

Create a task using Milestone 6.

Then:

```http
PATCH /tasks/:id
```

Request:

```json
{
  "sprintId": "<sprint-id>"
}
```

Expected:

```text
200 OK
```

Verify the task now has the sprint ID.

---

## Test 4 — Remove Task From Sprint

Call:

```http
PATCH /tasks/:id
```

Request:

```json
{
  "sprintId": null
}
```

Expected:

```text
200 OK
```

Verify:

```text
sprintId = null
```

---

## Test 5 — Cross-Project Assignment

Create:

```text
Project A
Project B
```

Create:

```text
Sprint A → Project A
Task B   → Project B
```

Attempt:

```http
PATCH /tasks/task-B
```

```json
{
  "sprintId": "sprint-A"
}
```

Expected:

```text
400/403
```

Use the project's existing error conventions.

The important requirement is:

**Task B must NOT be assigned to Sprint A.**

---

## Test 6 — Unauthorized User

User C is not a member of the workspace.

Attempt:

```text
POST /projects/:id/sprints
PATCH /sprints/:id
PATCH /tasks/:id
```

Expected:

```text
403 Forbidden
```

---

# 11. Acceptance Criteria

Milestone 7 is complete when:

* [ ] `POST /projects/:id/sprints` creates a sprint
* [ ] New sprint defaults to `PLANNED`
* [ ] Sprint belongs to the correct project
* [ ] Workspace membership is checked
* [ ] `PATCH /sprints/:id` updates sprint fields
* [ ] Sprint status supports `PLANNED`
* [ ] Sprint status supports `ACTIVE`
* [ ] Sprint status supports `COMPLETED`
* [ ] Invalid sprint status is rejected
* [ ] Invalid date range is rejected
* [ ] `PATCH /tasks/:id` accepts `sprintId`
* [ ] Task can be assigned to a sprint
* [ ] Task can be removed from a sprint using `sprintId: null`
* [ ] Task and sprint must belong to the same project
* [ ] Non-members cannot modify sprint/task assignments
* [ ] Existing Task behavior still works
* [ ] Existing Auth, Workspace, and Project APIs still work
* [ ] Postman tests pass

---

# Scope — Important

Implement **ONLY Milestone 7**.

Do NOT implement:

* Sprint frontend
* Task frontend
* Kanban frontend
* Drag & drop
* Sprint filtering UI
* AI
* WebSockets
* Real-time updates
* Notifications
* Sprint reports
* Burndown charts
* Advanced sprint rules
* Invitation system changes

The next milestone will handle the frontend.

---

# Completion Report

After implementation, report only:

1. Files created/modified
2. Endpoints added/updated
3. Prisma changes, if any
4. Validation implemented
5. Authorization implemented/reused
6. Postman test results
7. Any issues encountered
