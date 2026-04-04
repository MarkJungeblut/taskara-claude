# Taskara Claude — Claude Code Entry Point

## Project Summary
Full-stack application with a **.NET 10** backend API and a **React + TypeScript** (Vite) frontend SPA.

- Full context: [docs/context.md](docs/context.md)
- Architecture: [docs/architecture/overview.md](docs/architecture/overview.md)
- Active plans: [docs/plans/](docs/plans/)
- Coding guidelines: [docs/guidelines/](docs/guidelines/)

## Tech Stack
| Layer     | Technology                    |
|-----------|-------------------------------|
| Backend   | .NET 10, ASP.NET Core, xUnit  |
| Frontend  | React 19, TypeScript, Vite    |
| CI/CD     | GitHub Actions                |

## Common Commands

### Backend (`src/backend/`)
```bash
dotnet restore
dotnet build
dotnet test
dotnet run --project <ProjectName>
```

### Frontend (`src/frontend/`)
```bash
npm ci
npm run dev        # dev server (Vite)
npm run build      # production build
npm run test       # Vitest
npm run lint       # ESLint
```

## Guidelines
- [Backend conventions](docs/guidelines/backend.md)
- [Frontend conventions](docs/guidelines/frontend.md)
- [Git workflow](docs/guidelines/git-workflow.md)
- [AI collaboration](docs/guidelines/ai-collaboration.md)

## Plan Lifecycle
When a plan is completed, archive it by **copying the session plan file verbatim** to `docs/plans/<NNN>-<slug>.md` and prepending a frontmatter block with `status: Completed`, `created`, and `updated` dates. Do NOT rewrite it from `docs/plans/_template.md` — the archive must be the exact plan that was implemented, preserving all context, design decisions, and detail.
