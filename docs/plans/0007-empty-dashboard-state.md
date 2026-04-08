---
status: Completed
created: 2026-04-08
updated: 2026-04-08
---

# Plan: Empty Dashboard State + Inline Title Editing

## Context
When a user opens or creates a dashboard, `DashboardViewerPage` is currently a stub (`<div>Dashboard Viewer</div>`). The mockup defines a proper empty state for this page — a dot-grid canvas with a ghost widget illustration and a primary action button. Additionally, the user wants to be able to rename the dashboard inline via a pen icon in the existing AppHeader, next to the breadcrumb title. Quick templates from the mockup are explicitly out of scope.

## Scope
Two files to modify; no new files needed.

---

## Task 0 — Create feature branch

```bash
git checkout -b feat/empty-dashboard-state
```

---

## Task 1 — Inline title editing in `AppHeader`

**File:** `src/frontend/src/shared/components/AppHeader.tsx`

The header already shows the dashboard name derived from the URL id (via `formatDashboardName`). Add inline editing:

- Store custom titles keyed by dashboard id in a `useState<Map<string, string>>` — falls back to `formatDashboardName` if no custom title set
- Track which dashboard id is being edited via `editingId` state — naturally resets on navigation without needing a `useEffect`
- **View mode:** `<span>{displayTitle}</span>` + pen (`edit`) icon button to its right
- **Edit mode:** `<input autoFocus>` styled to match the headline span (transparent bg, bottom border only), with Enter to commit and Escape to discard. `onBlur` commits the value.
- Pen icon only renders when `dashboardIdMatch` is true
- Existing right-side "Edit" / "Save Changes" / "Cancel" buttons unchanged

---

## Task 2 — Empty state canvas in `DashboardViewerPage`

**File:** `src/frontend/src/features/dashboards/pages/DashboardViewerPage.tsx`

Replace the stub with a full-height centered empty state:

**Dot-grid background:**
```css
background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
background-size: 24px 24px;
```

**Ghost widget illustration:**
- Relative container with `rotate-3` tilt
- 2×2 grid of `rounded-xl border border-slate-200 bg-white` placeholder rects at 40–60% opacity
- Absolutely centered white circle (`w-24 h-24`) with `dashboard_customize` material icon in `text-primary`

**Text content:**
- Eyebrow: `"YOUR CANVAS IS READY"` — `text-xs font-semibold uppercase tracking-widest text-primary`
- Headline: `"Start building your data masterpiece."` — `font-headline text-4xl font-extrabold text-slate-900`
- Body: `"Combine metrics, charts, and visualizations to create a dashboard that tells your unique story."` — `text-sm text-slate-500`

**Primary action button:**
- `"ADD YOUR FIRST WIDGET"` with leading `add` material icon
- `bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all`

No quick templates.

---

## Verification

- [x] Navigate to `/` — list page unchanged, AppHeader shows "Dashboards" (no pen icon)
- [x] Click any dashboard card → breadcrumb shows "← Dashboards / [Title]" with pen icon
- [x] Canvas fills the page with dot-grid, ghost illustration, headline, and button
- [x] Click pen → inline input appears; Enter/blur saves; Escape discards
- [x] `npm run lint` passes
