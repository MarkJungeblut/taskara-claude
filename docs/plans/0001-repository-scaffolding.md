---
status: Completed
created: 2026-03-31
updated: 2026-03-31
---

# Plan: Repository Scaffolding

## Goal
Establish a clean, consistent repository structure before any feature work begins — including documentation, a plan-tracking system, architecture decision records, coding guidelines, CI/CD workflows, and Claude Code context files.

## Scope
**In scope:**
- `CLAUDE.md` and `docs/` folder structure
- Architecture overview and first ADR
- Coding guidelines (backend, frontend, git workflow)
- `.gitignore`, `README.md`, `PR template`
- GitHub Actions workflows for backend and frontend

**Out of scope:**
- Actual .NET solution/project files (`src/backend/`)
- Actual React app (`src/frontend/`)
- Database setup, Docker, or infrastructure

## Tasks
- [x] Create `CLAUDE.md` with project description, tech stack, commands, and doc pointers
- [x] Create `docs/context.md` — project overview and tech stack rationale
- [x] Create `docs/architecture/overview.md` — system diagram and component responsibilities
- [x] Create `docs/architecture/decisions/0001-use-dotnet10-and-react.md` — first ADR
- [x] Create `docs/guidelines/backend.md` — .NET conventions, DI, API, testing
- [x] Create `docs/guidelines/frontend.md` — React/TS conventions, state, API client, testing
- [x] Create `docs/guidelines/git-workflow.md` — branching, Conventional Commits, PR process
- [x] Create `docs/plans/_template.md` — plan template with status frontmatter
- [x] Create `.gitignore` — combined .NET + Node.js + macOS/Windows patterns
- [x] Create `README.md` — top-level setup instructions for both stacks
- [x] Create `.github/PULL_REQUEST_TEMPLATE.md` — structured PR template
- [x] Create `.github/workflows/backend.yml` — dotnet restore / build / test
- [x] Create `.github/workflows/frontend.yml` — npm ci / build / test

## Implementation Notes
- Used .NET 10 and React 19 + TypeScript (Vite) as the confirmed tech stack
- `CLAUDE.md` intentionally kept short — full context lives in `docs/context.md`
- ADR uses lightweight MADR format
- CI workflows trigger on both PR and push to main

## Verification
1. `git status` showed all new files staged cleanly
2. `cat CLAUDE.md` loads fast context in any future Claude session
3. `docs/plans/` has the template and is ready to receive future plans
4. `.gitignore` correctly ignores `bin/`, `obj/`, `node_modules/`, `.env` files
