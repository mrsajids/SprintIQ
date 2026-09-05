# SprintIQ — Milestone 4: Workspace API

Implement **only Milestone 4 — Workspace API**.

## Current Status

Authentication is already completed:

* Register API ✅
* Login API ✅
* Refresh token API ✅
* Logout API ✅
* Auth middleware ✅
* Frontend authentication ✅
* Prisma + PostgreSQL ✅

Do **not modify the existing authentication implementation** unless absolutely required.

---

## Existing Prisma Models

The database already contains:

* `User`
* `Workspace`
* `WorkspaceMember`

Relevant fields:

```prisma
model Workspace {
  id        String @id @default(cuid())
  name      String

  members   WorkspaceMember[]
  projects  Project[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model WorkspaceMember {
  id          String        @id @default(cuid())
  role        WorkspaceRole @default(MEMBER)

  userId      String
  workspaceId String

  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@unique([userId, workspaceId])
}

enum WorkspaceRole {
  ADMIN
  MEMBER
}
```

**Do not change the Prisma schema.**

---

# Tasks

## 1. Create Workspace

Add:

```http
POST /workspaces
Authorization: Bearer <access_token>
```

Request:

```json
{
  "name": "SprintIQ Engineering"
}
```

Requirements:

* User must be authenticated.
* Validate workspace name.
* Create the workspace.
* Create a `WorkspaceMember` record for the logged-in user.
* Creator must have role `ADMIN`.
* Workspace creation and membership creation should use a Prisma transaction.
* Do not accept `userId` or `role` from the request body.
* Get the creator from the authenticated user:

```text
req.user.id
```

Return the created workspace.

---

## 2. List User Workspaces

Add:

```http
GET /workspaces
Authorization: Bearer <access_token>
```

Requirements:

* User must be authenticated.
* Return only workspaces where the logged-in user is a member.
* Include the user's workspace role.
* Do not expose workspaces belonging to other users.

Example response:

```json
[
  {
    "id": "workspace-id",
    "name": "SprintIQ Engineering",
    "role": "ADMIN"
  }
]
```

---

## 3. Invite Existing User

Add:

```http
POST /workspaces/:id/invite
Authorization: Bearer <access_token>
```

Request:

```json
{
  "email": "user@example.com"
}
```

Requirements:

1. User must be authenticated.
2. Verify the requester is a member of the workspace.
3. Find the target user by email.
4. If the user doesn't exist, return an appropriate `404`.
5. Check whether the user is already a workspace member.
6. Prevent duplicate membership.
7. Add the user as:

```text
MEMBER
```

No email sending is required.

For this milestone, "invite" simply means adding an existing user to the workspace.

---

# Workspace Authorization

Create a small reusable middleware/helper for checking workspace membership.

For endpoints that operate on:

```text
/workspaces/:id/...
```

verify that:

```text
authenticated user
        ↓
WorkspaceMember
        ↓
workspace ID
```

If the user is not a member, return:

```http
403 Forbidden
```

Example:

```json
{
  "message": "You are not a member of this workspace"
}
```

Keep this reusable because later Project, Task, and Sprint APIs will need the same authorization.

Do not implement full RBAC yet.

---

# Follow Existing Code Style

Before implementing:

1. Inspect the existing Auth module.
2. Follow its existing:

   * folder structure
   * route style
   * controller/service pattern
   * validation approach
   * error handling
   * response format
   * Prisma client usage

Do **not** introduce a new architecture if the project already has one.

---

# Validation

At minimum:

### Create Workspace

```text
name required
name must not be empty
```

### Invite

```text
email required
email must be valid
```

Use the validation library already present in the project.

Do not add another validation library unnecessarily.

---

# Error Cases

Handle at least:

```text
401 → unauthenticated
403 → not a workspace member
404 → user/workspace not found
409 → user already belongs to workspace
400 → invalid request
```

Follow the existing API error format.

---

# Postman Testing

Add/test these three endpoints:

```text
POST /workspaces
GET /workspaces
POST /workspaces/:id/invite
```

Use three users.

### Test 1 — User A

```text
Register/Login
      ↓
POST /workspaces
```

Expected:

```text
Workspace created
User A = ADMIN
```

### Test 2 — User B

```text
Register/Login
      ↓
GET /workspaces
```

Expected:

```text
Workspace A is NOT visible
```

Then User A:

```text
POST /workspaces/:id/invite
```

with User B's email.

Then User B:

```text
GET /workspaces
```

Expected:

```text
Workspace A
Role = MEMBER
```

### Test 3 — User C

User C is not a member.

Attempt to access the workspace through the invite endpoint or another protected workspace endpoint.

Expected:

```text
403 Forbidden
```

---

# Scope — Important

Implement **ONLY Workspace API**.

Do NOT implement:

* Project API
* Task API
* Sprint API
* Kanban
* Frontend workspace UI
* Drag & drop
* AI
* WebSockets
* Real-time functionality
* Notifications

Do not modify the Prisma schema.

Do not rewrite authentication.

---

# Completion Report

After implementation, report only:

1. Files created/modified
2. Endpoints added
3. Any Prisma changes
4. Postman test results
5. Any issues encountered

The milestone is complete when:

* [ ] User can create a workspace
* [ ] Creator becomes ADMIN
* [ ] User can list their workspaces
* [ ] User can invite an existing user
* [ ] Invited user becomes MEMBER
* [ ] Duplicate membership is prevented
* [ ] Non-members cannot access protected workspace operations
* [ ] Existing authentication still works
* [ ] Postman tests pass
