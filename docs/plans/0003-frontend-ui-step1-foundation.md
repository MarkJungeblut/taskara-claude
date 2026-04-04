---
status: Completed
created: 2026-04-04
updated: 2026-04-04
---

# Plan: Frontend UI — Step 1: Foundation

## Goal
Establish the routing, styling, and icon infrastructure needed before any UI components can be built, based on the mockup design system in `docs/mockup/stitch_taskara/`.

## Scope
**In scope:** React Router setup, Tailwind v4 configuration with mockup color tokens, Google Fonts (Manrope + Inter), Material Symbols CDN, stub route pages.  
**Out of scope:** Any actual UI components, layout shell, or real data.

## Tasks
- [x] Install `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`
- [x] Add `@tailwindcss/vite` plugin to `vite.config.ts`
- [x] Replace `index.css` with Tailwind directives and CSS custom properties for color tokens
- [x] Add Google Fonts (Manrope + Inter) and Material Symbols Outlined CDN links to `index.html`
- [x] Set up React Router in `App.tsx` with three routes: `/`, `/dashboard/:id`, `/dashboard/:id/edit`
- [x] Create stub page components: `DashboardListPage`, `DashboardViewerPage`, `DashboardEditorPage`
- [x] Verify: `npm run lint` and `npm run build` pass

## Implementation Notes
- Tailwind v4 uses `@theme {}` blocks in CSS (not `tailwind.config.js`) for custom tokens.
- Color tokens mapped from mockup: `--color-primary: #4647d3`, `--color-secondary: #006576`, `--color-tertiary: #9e00b4`, `--color-surface: #f4f6ff`.
- Font families defined as `--font-family-sans` (Inter) and `--font-family-heading` (Manrope) via `@theme`.
- The `src/features/.gitkeep` file was replaced by the new `dashboards/` directory.

## Verification
1. `npm run build` — TypeScript compiles, Vite bundles without errors ✓
2. `npm run lint` — ESLint passes (0 errors) ✓
3. Routes `/`, `/dashboard/1`, `/dashboard/1/edit` each render the correct stub text
4. PR: [MarkJungeblut/taskara-claude#2](https://github.com/MarkJungeblut/taskara-claude/pull/2)
