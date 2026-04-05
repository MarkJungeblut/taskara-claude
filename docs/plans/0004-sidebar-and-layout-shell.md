---
status: Completed
created: 2026-04-05
updated: 2026-04-05
---

# Plan: Step 2 — Sidebar Component + Layout Shell

## Context

The routing foundation (Step 1) is in place: three stub pages, React Router v7, Tailwind v4, fonts, and Material Symbols are all wired up. The next step is the persistent layout shell — a fixed sidebar nav that appears on every page. This plan implements:

1. A reusable `Sidebar` component matching the mockup at `docs/mockup/stitch_taskara/taskara_dashboard_list/`
2. A `Layout` wrapper using React Router's nested route/Outlet pattern
3. Updated routing in `App.tsx` to use the layout

The top header is explicitly **out of scope** — that is Step 3.

---

## Mockup Reference

`docs/mockup/stitch_taskara/taskara_dashboard_list/screen.png` / `code.html`

**Sidebar anatomy:**
- Fixed left, `w-64` (256px), full height, `bg-slate-100`, `border-r border-slate-200`
- **Brand section**: "Taskara" (Inter bold) + "DASHBOARD BUILDER" (uppercase, tracking-wider, slate-500, 11px)
- **Main nav** (3 items): Overview (`dashboard` icon), Data Sources (`database` icon), Archive (`archive` icon)
- **Bottom section** (separated by `border-t`): Settings (`settings` icon), Info (`info` icon)
- **Active item**: `bg-white shadow-sm text-primary rounded-xl`
- **Inactive item**: `text-slate-500 hover:bg-slate-200 rounded-xl hover:translate-x-1 transition-transform`

---

## Tasks

- [x] Create `src/frontend/src/shared/components/Sidebar.tsx`
- [x] Create `src/frontend/src/shared/components/Layout.tsx`
- [x] Update `src/frontend/src/App.tsx` with nested layout route
- [x] Verify lint passes

---

## Files Modified / Created

| File | Change |
|------|--------|
| `src/frontend/src/shared/components/Sidebar.tsx` | Created |
| `src/frontend/src/shared/components/Layout.tsx` | Created |
| `src/frontend/src/App.tsx` | Modified — nested routes under `<Layout />` |

## Upcoming Steps (brief overview)
| Step | Name | Description |
|------|------|-------------|
| 3 | Top Header | Sticky header: page title, search bar, notification/settings icons, user avatar |
| 4 | Dashboard List | Landing page at `/` — responsive card grid with test data, "Create New Dashboard" button |
| 5 | Dashboard Viewer | Read-only bento grid at `/dashboard/:id` — hardcoded widget cards |
| 6 | Dashboard Editor | Edit mode at `/dashboard/:id/edit` — drag/settings overlays, "Add Widget" drop zone |
| 7 | Widget Modal | Two-step modal for adding widgets: type picker + layout scale picker |
