# Frontend Guidelines (React + TypeScript + Vite)

## Project Layout

```
src/frontend/
├── public/                  # Static assets (favicon, robots.txt)
├── src/
│   ├── app/                 # App shell, router, global providers
│   ├── features/            # Feature folders (colocate component, hook, types, tests)
│   │   └── task-items/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── api.ts       # API calls for this feature
│   │       └── types.ts
│   ├── shared/              # Reusable UI primitives, utilities, shared types
│   ├── api/                 # Base API client (fetch wrapper / Axios instance)
│   └── main.tsx             # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Naming Conventions

| Artifact            | Pattern                    | Example                    |
|---------------------|----------------------------|----------------------------|
| Component file      | PascalCase `.tsx`          | `TaskList.tsx`             |
| Hook file           | `use` + PascalCase `.ts`   | `useTaskItems.ts`          |
| Utility file        | camelCase `.ts`            | `formatDate.ts`            |
| Type / Interface    | PascalCase                 | `TaskItem`, `ApiResponse`  |
| CSS module          | camelCase `.module.css`    | `taskList.module.css`      |

## Component Structure

- One component per file.
- Export the component as a named export (not default).
- Keep components small; extract logic into custom hooks.
- Prefer function components with hooks — no class components.

## State Management

- Local UI state: `useState` / `useReducer`.
- Server state (fetching, caching, mutations): **TanStack Query** (React Query).
- Global client state (if needed): **Zustand** — avoid Redux unless complexity warrants it.

## API Client Pattern

- All API calls go through a typed client in `src/api/` or the feature's `api.ts`.
- Use environment variables (`VITE_API_BASE_URL`) — never hardcode URLs.
- Wrap `fetch` or Axios to handle auth headers, base URL, and error normalization centrally.

## TypeScript

- `strict: true` is required in `tsconfig.json`.
- Avoid `any`; use `unknown` + type guards when the shape is truly unknown.
- Prefer `interface` for object shapes, `type` for unions and mapped types.

## Testing

- Framework: **Vitest** + **React Testing Library**
- Test files live alongside the code they test: `TaskList.test.tsx`.
- Test behavior, not implementation — query by accessible roles/text, not CSS classes.
- Do not test internal state directly; interact through the rendered UI.
