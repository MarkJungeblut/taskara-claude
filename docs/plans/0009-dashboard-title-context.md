---
status: Completed
created: 2026-04-08
updated: 2026-04-08
---

# Plan: Share Dashboard Titles via Context

## Context
When a user renames a dashboard in AppHeader, the updated title was stored in local component state. Navigating back to the list page showed the original title from MOCK_DASHBOARDS because the two components had no shared state. Lifting the titles map into a React Context makes the rename visible everywhere.

## Scope
1 new file, 3 files modified.

---

## Task 0 — Branch already exists

Already on `feat/empty-dashboard-state`.

---

## Task 1 — Create `DashboardTitlesContext`

**New file:** `src/frontend/src/features/dashboards/DashboardTitlesContext.tsx`

- Context exposes `getTitle(id, fallback)` and `setTitle(id, title)`
- Provider holds a `Map<string, string>` in `useState`
- Hook export suppressed from react-refresh with `eslint-disable-next-line` comment (standard pattern for context files)

---

## Task 2 — Provide context in `App.tsx`

**File:** `src/frontend/src/App.tsx`

Wrapped `<BrowserRouter>` with `<DashboardTitlesProvider>`.

---

## Task 3 — Use context in `AppHeader`

**File:** `src/frontend/src/shared/components/AppHeader.tsx`

- Removed `customTitles` / `setCustomTitles` local state
- `displayTitle` now calls `getTitle(dashboardId, dashboardName)`
- `commitTitle` now calls `setTitle(dashboardId, trimmed || dashboardName)`

---

## Task 4 — Use context in `DashboardCard`

**File:** `src/frontend/src/features/dashboards/components/DashboardCard.tsx`

- `<h3>` now renders `getTitle(id, title)` instead of `title`

---

## Verification

- [x] Open a dashboard → rename it in the header → navigate back to list → card shows the new title
- [x] Rename back → list updates again
- [x] `npm run lint` passes
