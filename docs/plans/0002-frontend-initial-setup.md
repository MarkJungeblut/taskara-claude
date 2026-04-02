---
status: Completed
created: 2026-04-02
updated: 2026-04-02
---

# Plan: Frontend Initial Setup

## Goal
Bootstrap the Vite + React + TypeScript SPA in `src/frontend/` so the project can begin feature development.

## Scope
**In scope:** Vite scaffold, ESLint, Prettier, Vitest + Testing Library, runtime deps (TanStack Query, Zustand), src/ directory structure.
**Out of scope:** Routing, API client implementation, any feature UI.

## Tasks
- [x] Scaffold Vite + React + TypeScript project (`create-vite --template react-ts`)
- [x] Clean up Vite boilerplate (App.css, sample components, README)
- [x] Restore and merge pre-existing ESLint config (`eslint.config.ts`) with Vite's `react-refresh` additions
- [x] Restore pre-existing Prettier config (`.prettierrc.json`)
- [x] Install runtime dependencies: `@tanstack/react-query`, `zustand`
- [x] Install dev dependencies: `typescript-eslint`, `eslint-config-prettier`, `prettier`, `vitest`, `@vitest/ui`, `@testing-library/*`, `jsdom`, `jiti`
- [x] Configure Vitest in `vite.config.ts` (jsdom environment, globals, setup file)
- [x] Create `src/test/setup.ts` with `@testing-library/jest-dom`
- [x] Establish `src/{app,features,shared,api}/` directories per guidelines
- [x] Update `package.json` scripts: `format`, `test`, `test:ui`

## Implementation Notes
- Vite 8's `create-vite` requires `--overwrite` flag (not `--yes`) for non-empty directories; it replaced the pre-existing `eslint.config.ts` with a `.js` version — both were recovered from git and merged.
- `eslint.config.ts` requires `jiti` as a dev dep (ESLint 9 loads TS configs via jiti).
- `vite.config.ts` must import `defineConfig` from `vitest/config` (not `vite`) to get `test` property types.
- `@typescript-eslint/no-non-null-assertion` (strict mode) flagged `getElementById('root')!` — replaced with an explicit null check and throw.
- `test` script uses `--passWithNoTests` so CI doesn't fail before any tests are written.

## Verification
1. `npm run dev` — dev server starts, blank page renders in browser
2. `npm run build` — TypeScript compiles, Vite bundles without errors ✓
3. `npm run lint` — ESLint passes (0 errors, 0 warnings) ✓
4. `npm run format --check` — Prettier reports no issues ✓
5. `npm run test -- --run` — Vitest exits 0 (no test files, pass-with-no-tests) ✓
