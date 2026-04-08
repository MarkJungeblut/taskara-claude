---
status: Completed
created: 2026-03-31
updated: 2026-04-06
---

# Plan: Dashboard List Page

## Context
The `DashboardListPage` is currently a one-line stub. This plan implements it based on the mockup at `docs/mockup/stitch_taskara/taskara_dashboard_list/`. The goal is a visual, interactive dashboard grid with mock in-code data — no database, no API calls yet.

The existing Layout, Sidebar, and AppHeader shells are already in place. Routing (`/` → `DashboardListPage`) is already wired in `App.tsx`.

Ignoring per user request: "AI Suggested Insights" footer section, "Curation Space" label.

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `src/frontend/src/features/dashboards/types.ts` | Create — Dashboard type |
| `src/frontend/src/features/dashboards/mockData.ts` | Create — 4 mock dashboards |
| `src/frontend/src/features/dashboards/components/DashboardCard.tsx` | Create — card component |
| `src/frontend/src/features/dashboards/pages/DashboardListPage.tsx` | Modify — replace stub |

---

## Step 1: `types.ts` — Dashboard interface

```ts
export type PreviewVariant = 'grid-4' | 'grid-6' | 'quad' | 'header-body';

export interface Dashboard {
  id: string;       // URL slug: "marketing-performance"
  title: string;
  subtitle: string; // "Updated 2 hours ago" / "Edited by Sarah M." etc.
  preview: PreviewVariant;
}
```

---

## Step 2: `mockData.ts` — 4 mock dashboards

Mirrors the 4 cards in the mockup exactly:
1. **marketing-performance** — preview `grid-4`
2. **user-retention-q3** — preview `grid-6`
3. **cloud-infrastructure** — preview `quad`
4. **financial-audit-2024** — preview `header-body`

---

## Step 3: `DashboardCard.tsx` — Named export

Structure:
```
<Link to={`/dashboard/${id}`}>
  <div group card>
    <PreviewThumbnail variant={preview} />      ← aspect-video box with layout blobs + hover overlay
    <div footer>
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <button more_vert icon (no action, stopPropagation) />
    </div>
  </div>
</Link>
```

`PreviewThumbnail` renders one of 4 layout variants (colored opacity blobs matching the mockup):
- `grid-4`: `grid-cols-4 grid-rows-3` — large primary block + secondary strip + tertiary/slate cells + full-width bar
- `grid-6`: `grid-cols-6 grid-rows-2` — secondary + tertiary halves + full-width primary bar
- `quad`: `grid-cols-2 grid-rows-2` — 4 equal quadrants (primary, secondary, tertiary, slate)
- `header-body`: flex column — primary header bar + slate body

The "Open Dashboard" hover overlay is inside the thumbnail with `opacity-0 group-hover:opacity-100`.

Uses design system tokens throughout: `bg-surface-container-lowest`, `bg-surface-container-low`, `text-on-surface`, `text-on-surface-variant`, `text-primary`, `border-outline-variant`, `rounded-xl`.

---

## Step 4: `DashboardListPage.tsx` — Replace stub

Structure:
```
<div page wrapper with dot-grid background>
  <div max-w-7xl mx-auto p-10>
    <header row>              ← "Your Dashboards" h2 (left) + "Create New Dashboard" button (right)
    <grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8>
      {MOCK_DASHBOARDS.map(d => <DashboardCard key={d.id} {...d} />)}
      <NewDashboardCard />     ← dashed border, add_chart icon, extracted to its own component
    </grid>
  </div>
</div>
```

Dot-grid: `absolute inset-0` div with inline `backgroundImage` radial-gradient (matches mockup `.dot-grid` class, avoids adding a global CSS class).

"Create New Dashboard" button: gradient `from-primary to-primary-container`, currently no-op (placeholder `onClick`).

`NewDashboardCard`: extracted to `src/frontend/src/features/dashboards/components/NewDashboardCard.tsx`.

---

## Branch

`feat/dashboard-list-page` from `main`. PR #7.

---

## Verification

1. Run `npm run dev` in `src/frontend/`
2. Open `http://localhost:5173/` — should show the dashboard grid with 4 cards + new dashboard placeholder
3. Click a card → navigates to `/dashboard/marketing-performance` (viewer stub)
4. Back button in AppHeader → returns to list
5. Run `npm run lint` — no errors
6. Run `npm run test` — existing tests still pass
