# SprintIQ CI/CD Implementation

## Overview

This document tracks the implementation of CI/CD for the SprintIQ monorepo.

### SprintIQ Architecture

```text
SprintIQ/
├── apps/
│   ├── web/                 # React + Vite frontend
│   └── api/                 # Node + Express + TypeScript backend
├── packages/
│   └── shared-types/        # Shared TypeScript types
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI
├── package.json
└── package-lock.json
```

---

# Implementation Index

## PHASE 1 — CI with GitHub Actions

- [x] Repository CI Setup
- [x] GitHub Actions Workflow
- [x] Dependency Installation
- [x] Web Lint Validation
- [x] Workspace Build Validation
- [x] Verify CI Run
- [ ] Pull Request CI verification — skipped for now

## PHASE 2 — Dockerization

- [x] Docker Setup
- [x] API Dockerfile
- [x] Web Dockerfile
- [x] `.dockerignore`
- [x] Build Docker Images
- [x] Run Containers Locally

## PHASE 3 — Docker Compose

- [x] Compose Configuration
- [x] SprintIQ API
- [x] SprintIQ Web
- [x] PostgreSQL
- [x] Redis
- [x] Environment Variables
- [x] Health Checks

## PHASE 4 — Container Registry

- [ ] Registry Setup
- [ ] Authenticate from GitHub Actions
- [ ] Build Images in CI
- [ ] Tag Images
- [ ] Push Images

## PHASE 5 — CD / Deployment

- [ ] Production Server
- [ ] Docker Installation
- [ ] Environment Configuration
- [ ] Pull Docker Images
- [ ] Deploy with Docker Compose
- [ ] Restart / Update Containers
- [ ] Deployment Health Check

## PHASE 6 — Nginx & HTTPS

- [ ] Domain Configuration
- [ ] Nginx Setup
- [ ] Frontend Routing
- [ ] API Reverse Proxy
- [ ] HTTPS / SSL
- [ ] Production Verification

## PHASE 7 — Secrets & Configuration

- [ ] GitHub Secrets
- [ ] Production Environment Variables
- [ ] Database Secrets
- [ ] JWT / Redis Secrets
- [ ] Secret Rotation

## PHASE 8 — Production Safety

- [ ] Health Checks
- [ ] Logs
- [ ] Container Restart Policy
- [ ] Database Backup
- [ ] Rollback
- [ ] Deployment Failure Handling

## PHASE 9 — Final CI/CD Pipeline

- [ ] Pull Request → CI
- [ ] Merge → Build
- [ ] Docker Image → Registry
- [ ] Deploy → Production
- [ ] Health Check
- [ ] Rollback on Failure

---

# CI/CD Target Architecture

```text
Developer
    │
    ▼
Git Push / Pull Request
    │
    ▼
GitHub Actions
    │
    ├── Lint
    ├── Build
    └── Test
         │
       PASS
         ▼
    Docker Build
         │
         ▼
  Container Registry
         │
         ▼
  Production Server
         │
         ▼
   Docker Compose
         │
    ┌────┴────┐
    ▼         ▼
   Web       API
              │
        ┌─────┴─────┐
        ▼           ▼
    PostgreSQL     Redis
        │
        ▼
   Health Check
        │
        ▼
      LIVE
```

---

# Current SprintIQ CI

## Workflow

File:

```text
.github/workflows/ci.yml
```

Current flow:

```text
GitHub Push / PR
       │
       ▼
Checkout repository
       │
       ▼
Setup Node.js 22
       │
       ▼
npm ci
       │
       ▼
Web ESLint
       │
       ▼
Build all workspaces
       │
       ▼
       PASS
```

## Current Root Scripts

The root `package.json` currently provides:

```json
{
  "scripts": {
    "dev:web": "npm run dev --workspace=web",
    "dev:api": "npm run dev --workspace=api",
    "dev": "concurrently \"npm run dev:web\" \"npm run dev:api\"",
    "build": "npm run build --workspaces"
  }
}
```

## Current Web Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## Current API Scripts

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

# Phase 1 Completion Criteria

Phase 1 is considered complete when:

- GitHub Actions detects `.github/workflows/ci.yml`
- Dependencies install successfully with `npm ci`
- Web lint passes
- All workspace builds pass
- CI runs successfully on GitHub

---

# Next Implementation

## Phase 2 — Dockerization

The next implementation starts with:

```text
apps/api/Dockerfile
apps/web/Dockerfile
.dockerignore
docker-compose.yml
```

The objective is to run the SprintIQ application consistently in containers before implementing the deployment pipeline.
