# Taskara Claude

Full-stack application — **.NET 10** backend API + **React + TypeScript** (Vite) frontend.

## Prerequisites

| Tool        | Version  |
|-------------|----------|
| .NET SDK    | 10.x     |
| Node.js     | 22.x LTS |
| npm         | 10.x     |

## Getting Started

### Backend

```bash
cd src/backend
dotnet restore
dotnet build
dotnet run --project <ProjectName>
```

### Frontend

```bash
cd src/frontend
npm ci
npm run dev
```

The frontend dev server proxies API requests to the backend by default.

## Running Tests

```bash
# Backend
cd src/backend && dotnet test

# Frontend
cd src/frontend && npm run test
```

## Project Structure

```
taskara-claude/
├── src/
│   ├── backend/          # .NET 10 solution
│   └── frontend/         # React + TypeScript (Vite)
├── docs/
│   ├── context.md
│   ├── architecture/
│   └── guidelines/
├── .github/
│   └── workflows/        # CI/CD
├── CLAUDE.md
└── README.md
```

## Documentation

- [Project context](docs/context.md)
- [Architecture overview](docs/architecture/overview.md)
- [Backend guidelines](docs/guidelines/backend.md)
- [Frontend guidelines](docs/guidelines/frontend.md)
- [Git workflow](docs/guidelines/git-workflow.md)
