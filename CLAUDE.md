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
Use `/plan` for all non-trivial changes. It covers the full workflow: branch creation → plan mode → implement → archive to `docs/plans/`. See `.claude/skills/plan/SKILL.md` for details.
