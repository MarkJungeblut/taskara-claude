---
status: Completed
created: 2026-04-04
updated: 2026-04-04
---

# Plan: Step 1 — Foundation Setup

> Part 1 of a series. Each step will be planned and implemented separately.

## Upcoming Steps (brief overview)
| Step | Name | Description |
|------|------|-------------|
| 2 | Layout Shell | Shared `Layout` component wrapping all pages: 64px fixed sidebar (brand + 3 nav items + bottom icons) and sticky top header (search bar, notification/settings icons, user avatar) |
| 3 | Dashboard List | Landing page at `/` — responsive card grid of dashboards with test data. Cards show a thumbnail placeholder, title, metadata, and team avatars. Includes a "Create New Dashboard" button. |
| 4 | Dashboard Viewer | Read-only bento grid at `/dashboard/:id` — 4 hardcoded widget cards in a 12-column layout (bar chart, metric summary, progress bars, geographic placeholder). Header has "Edit Dashboard" button. |
| 5 | Dashboard Editor | Edit mode at `/dashboard/:id/edit` — same bento grid but with drag/settings overlays on widgets, breadcrumb header with "Exit Edit" + "Save Changes", and an "Add Widget" drop zone at the bottom. |
| 6 | Widget Modal | Two-step modal for adding widgets: Step 1 picks widget type (Table, Line Chart, Pie Chart, Bar Chart); Step 2 picks layout scale (50% or 100%). Triggered from the editor's add zone. |

## Context
The frontend is a blank slate (`App.tsx` renders only "Taskara"). Before building any UI, we need routing, styling infrastructure, fonts, and icons in place. This step establishes the foundation everything else will build on.

## Mockup Design System (from mockups)
- **Primary**: `#4647d3` (indigo)
- **Secondary**: `#006576` (dark cyan)
- **Tertiary**: `#9e00b4` (magenta)
- **Surface**: `#f4f6ff` (very light blue-white)
- **Fonts**: Manrope (headings) + Inter (body)
- **Icons**: Material Symbols (outlined style)

## What This Step Does

### 1. Install dependencies
```
react-router-dom        — page routing
tailwindcss             — utility CSS
@tailwindcss/vite       — Tailwind v4 Vite plugin
```

### 2. Configure Tailwind
- Add `@tailwindcss/vite` plugin to `vite.config.ts`
- Replace `index.css` content with Tailwind directives + CSS custom properties for the color tokens

### 3. Add fonts + icons to `index.html`
Google Fonts CDN:
- Manrope (400–800)
- Inter (400–600)
- Material Symbols Outlined

### 4. Set up routing in `App.tsx`
Three routes wired up (pages are stubs for now):
- `/` → `DashboardListPage` (stub: "Dashboard List")
- `/dashboard/:id` → `DashboardViewerPage` (stub: "Dashboard Viewer")
- `/dashboard/:id/edit` → `DashboardEditorPage` (stub: "Dashboard Editor")

Page stubs go in `src/features/dashboards/pages/`.

## Files Modified / Created
| File | Change |
|------|--------|
| `src/frontend/package.json` | add 3 deps |
| `src/frontend/vite.config.ts` | add Tailwind plugin |
| `src/frontend/index.html` | add Google Fonts + Material Symbols CDN |
| `src/frontend/src/index.css` | Tailwind directives + color tokens |
| `src/frontend/src/App.tsx` | React Router setup with 3 routes |
| `src/frontend/src/features/dashboards/pages/DashboardListPage.tsx` | stub |
| `src/frontend/src/features/dashboards/pages/DashboardViewerPage.tsx` | stub |
| `src/frontend/src/features/dashboards/pages/DashboardEditorPage.tsx` | stub |

## Git Workflow
1. `git checkout main && git pull` — ensure main is up to date
2. `git checkout -b feat/frontend-step-1-foundation` — create feature branch

## Verification
1. `npm ci` installs without errors
2. `npm run dev` starts the dev server
3. Navigating to `/`, `/dashboard/1`, `/dashboard/1/edit` each renders the correct stub text
4. Tailwind utility classes work (verify a color renders correctly)
5. A Material Symbol icon renders correctly in the browser
6. `npm run lint` passes

## After Verification
- Commit changes and open a PR against `main`
