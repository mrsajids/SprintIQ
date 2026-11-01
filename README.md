# 🚀 SprintIQ

### AI-powered project management for software teams.

**SprintIQ** is a modern, AI-powered software development workspace designed to help engineering teams manage the entire software delivery lifecycle in one place.

From **requirements and issues** to **sprints, documentation, code, and releases**, SprintIQ brings the tools software teams use every day into a single intelligent workspace.

> **Plan smarter. Build faster. Ship better.**  

---

## ✨ Core Features

* 🤖 **AI Assistant** — Generate requirements, break down tasks, summarize issues, and assist with planning. 
* 📋 **Issue Management** — Create, assign, prioritize, label, and track issues.
* 🏃 **Sprint Management** — Plan sprints, manage backlogs, and track progress.
* 📊 **Project Dashboard** — Monitor project health, velocity, progress, and team activity.
* 📚 **Documentation** — Create and organize project and technical documentation.
* 💻 **Code Workspace** — Connect development work with issues and tasks.
* 🚀 **Release Management** — Track versions, milestones, and software releases.
* 👥 **Team Collaboration** — Manage members, roles, permissions, and activity.
* 🔔 **Notifications** — Stay informed about assignments, mentions, updates, and deadlines.
* 📈 **Analytics** — Understand team performance, sprint velocity, workload, and delivery trends.

---

## 🎯 Vision

SprintIQ aims to become an **AI-native alternative to traditional software project-management platforms**.

Instead of simply helping teams track work, SprintIQ uses AI to understand the context behind the work and help teams make better decisions.

**Requirements → Issues → Sprints → Development → Documentation → Releases**

---

## 🏗️ Architecture & Tech Stack

This project is structured as an **npm workspaces monorepo**:

* **Frontend (`apps/web`):** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide icons, React Router v7
* **Backend (`apps/api`):** Node.js, Express, TypeScript, Prisma 7 ORM, JWT Authentication
* **Database & Cache:** PostgreSQL 16, Redis 7
* **Shared Types (`packages/shared-types`):** Shared domain types, enums, and API interfaces
* **DevOps:** Docker, Docker Compose

---

## 🚀 Getting Started & Setup Guide

### 📋 Prerequisites

Make sure the following tools are installed on your machine:
* **Node.js** (v20+ or v24+)
* **npm** (v10+ or v11+)
* **Docker & Docker Compose**

---

### 1. Environment Configuration

Copy the example environment file into `.env` at the root of the repository:

```bash
cp .env.example .env
```

Configure the variables in `.env` (the defaults work out of the box for local development):

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=sprintiq

# Service Connection URLs (pointing to localhost)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sprintiq?schema=public
REDIS_URL=redis://127.0.0.1:6379

# Authentication & Security
JWT_ACCESS_SECRET=your_super_secret_jwt_access_token_key_here
JWT_ACCESS_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=604800
```

> [!IMPORTANT]
> The API server requires `JWT_ACCESS_SECRET` to start up.

---

### 2. Option A: Local Development Setup (Recommended)

In this workflow, PostgreSQL and Redis run in Docker, while the backend API and frontend Vite server run locally with hot-reloading.

#### Step 1: Start Database and Redis
```bash
docker compose up -d postgres redis
```

Verify that both containers are running:
```bash
docker compose ps
```

#### Step 2: Install Workspace Dependencies
From the repository root:
```bash
npm install
```

#### Step 3: Run Database Migrations & Generate Prisma Client
SprintIQ uses Prisma 7 with client generation in `apps/api/src/generated/prisma`.

```bash
# Apply database migrations
npx --workspace=api prisma migrate deploy

# Generate the TypeScript Prisma client
npx --workspace=api prisma generate
```

#### Step 4: Start the Development Servers
Start both the API and Web apps concurrently:
```bash
npm run dev
```

Or run them individually in separate terminal windows:
* **API Server (`http://localhost:3000`):**
  ```bash
  npm run dev:api
  ```
* **Web Frontend (`http://localhost:5173`):**
  ```bash
  npm run dev:web
  ```

---

### 3. Option B: Full Docker Compose Setup

Run the entire application stack (Frontend, API, PostgreSQL, and Redis) containerized with Docker Compose.

1. In your `.env` file, set the service hostnames to the Docker container names:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@postgres:5432/sprintiq?schema=public
   REDIS_URL=redis://redis:6379
   ```

2. Build and start all containers:
   ```bash
   docker compose up --build
   ```

3. Run migrations inside the API container (first run only):
   ```bash
   docker compose exec api npx prisma migrate deploy
   ```

---

### 🌐 Service Endpoints

| Service | Local Dev URL | Full Docker Compose URL | Description |
| :--- | :--- | :--- | :--- |
| **Web Frontend** | `http://localhost:5173` | `http://localhost:8080` | SprintIQ React application |
| **Backend API** | `http://localhost:3000` | `http://localhost:3000` | Express REST API |
| **Health Check** | `http://localhost:3000/api/health` | `http://localhost:3000/api/health` | Health endpoint (`{"status":"ok"}`) |
| **PostgreSQL** | `localhost:5432` | `localhost:5432` | Relational Database |
| **Redis** | `localhost:6379` | `localhost:6379` | Session / Cache Store |

---

### 📦 Available Monorepo Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Concurrently runs `dev:web` and `dev:api` in watch mode |
| `npm run dev:web` | Starts the Vite frontend dev server with HMR |
| `npm run dev:api` | Starts the Express API server with `tsx watch` |
| `npm run build` | Builds all packages and applications across the workspace |

---

### 🧪 API Testing & Postman Collections

Pre-configured Postman collections are included in `apps/api/postman-collections/`:
* `SprintIQ.postman_collection.json` — Auth, Workspaces, and Projects
* `SprintIQ-Milestone-06-Tasks.postman_collection.json` — Tasks
* `SprintIQ-Milestone-07-Sprints.postman_collection.json` — Sprints

Import these collections into Postman or Thunder Client to test API endpoints.

---

## 📌 Why SprintIQ?

Traditional project-management tools primarily act as systems of record.

SprintIQ is designed to become a **system of intelligence** for software teams—understanding projects, issues, requirements, and development context to reduce repetitive work and help teams ship software more efficiently.

---

**SprintIQ — Plan smarter. Build faster. Ship better.**
