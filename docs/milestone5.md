# SprintIQ — Milestone 5: Project API

Implement **only Milestone 5 — Project API**.

## Current Status

Completed:

* Authentication backend ✅
* Authentication frontend ✅
* Prisma + PostgreSQL ✅
* Workspace API ✅

  * Create workspace
  * List user's workspaces
  * Invite existing user
  * Workspace membership authorization

Now implement the **Project API**.

Do not modify working Authentication or Workspace functionality unless absolutely necessary.

---

# Existing Prisma Project Model

Use the existing model:

```prisma
model Project {
  id          String    @id @default(cuid())
  name        String
  description String?

  workspaceId String
  createdById String

  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  createdBy   User      @relation(fields: [createdById], references: [id])

  sprints     Sprint[]
  tasks       Task[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([workspaceId])
}
```

**Do not change the Prisma schema.**

---

# 1. Create Project

Add:

```http
POST /projects
Authorization: Bearer <access_token>
```

Request:

```json
{
  "workspaceId": "workspace-id",
  "name": "SprintIQ Web",
  "description": "SprintIQ frontend application"
}
```

Requirements:

* User must be authenticated.
* Validate the request.
* Verify the workspace exists.
* Verify the authenticated user is a member of the workspace.
* Create the project.
* Set `createdById` using the authenticated user's ID.
* Do not accept `createdById` from the request body.

The backend should determine:

```text
createdById = req.user.id
```

Return the created project.

---

# 2. List Workspace Projects

Add:

```http
GET /workspaces/:id/projects
Authorization: Bearer <access_token>
```

Requirements:

* User must be authenticated.
* Verify the user is a member of the workspace.
* Return projects belonging to that workspace.
* Do not return projects from another workspace.

Example:

```json
[
  {
    "id": "project-id",
    "name": "SprintIQ Web",
    "description": "SprintIQ frontend application",
    "workspaceId": "workspace-id",
    "createdById": "user-id"
  }
]
```

An empty workspace should return:

```json
[]
```

---

# 3. Reuse Workspace Authorization

Milestone 4 already introduced workspace membership authorization.

**Reuse the existing middleware/helper.**

The intended flow is:

```text
authenticate
     ↓
workspace membership check
     ↓
project controller/service
```

Do not create a second implementation of the same membership check.

For a user who is not a workspace member:

```http
403 Forbidden
```

Use the existing error-response convention from the project.

---

# 4. Validation

### Create Project

Validate:

```text
name        → required, non-empty
workspaceId → required
description → optional
```

Use the validation approach already present in the project.

Do not introduce a new validation library.

---

# 5. Authorization Scenarios

Test these cases.

### User A

User A owns Workspace A.

User A should be able to:

```text
POST /projects
GET /workspaces/A/projects
```

### User B

User B is invited to Workspace A.

User B should be able to:

```text
POST /projects
GET /workspaces/A/projects
```

### User C

User C is not a member of Workspace A.

User C must NOT be able to:

```text
POST /projects
GET /workspaces/A/projects
```

Expected:

```text
403 Forbidden
```

---

# 6. Follow Existing Architecture

Before coding:

1. Inspect the existing Workspace implementation.
2. Follow the same:

   * route structure
   * controller/service pattern
   * validation
   * error handling
   * response format
   * Prisma client usage

Do not introduce a new architecture.

Keep the Project module small and consistent with Workspace.

---

# 8. Postman Testing

Add/test:

```text
POST /projects
GET /workspaces/:id/projects
```

Recommended test sequence:

### User A

```text
Login
 ↓
Create Workspace
 ↓
Create Project
 ↓
GET workspace projects
```

Expected:

```text
Project appears
```

### User B

```text
Login
 ↓
GET /workspaces/:id/projects
```

Before invitation:

```text
403 Forbidden
```

After User A invites User B:

```text
GET /workspaces/:id/projects
```

Expected:

```text
200 OK
Project list returned
```

User B should also be able to create a project in that workspace.

### User C

Login as a user who is not a workspace member.

Try:

```text
GET /workspaces/:id/projects
```

and:

```text
POST /projects
```

Expected:

```text
403 Forbidden
```

---

# Scope — Important

Implement **ONLY Project API**.

Do NOT implement:

* Task API
* Sprint API
* Kanban
* Frontend Project UI
* Frontend Workspace UI
* Drag & drop
* AI
* WebSockets
* Real-time functionality

Do not modify the Prisma schema.

Do not rewrite Authentication.

Do not rewrite Workspace API.

---

# Completion Report

After implementation, report:

1. Files created/modified
2. Endpoints added
3. Prisma changes, if any
4. Authorization behavior
5. Postman test results
6. Any issues encountered

## Milestone 5 is complete when:

* [ ] Authenticated user can create a project
* [ ] Project belongs to the selected workspace
* [ ] `createdById` comes from authenticated user
* [ ] Workspace membership is checked
* [ ] Workspace member can list projects
* [ ] Non-member cannot list projects
* [ ] Non-member cannot create projects
* [ ] Validation works
* [ ] Existing Workspace and Auth APIs still work
* [ ] Postman tests pass
