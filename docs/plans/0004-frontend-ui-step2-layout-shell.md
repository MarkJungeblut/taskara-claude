---
status: Completed
created: 2026-04-04
updated: 2026-04-04
---

# Plan: Step 2 — Layout Shell

> Part 2 of a series. Each step planned and implemented separately.

## Upcoming Steps (brief overview)
| Step | Name | Description |
|------|------|-------------|
| 3 | Dashboard List | Landing page at `/` — responsive card grid with test data, "Create New Dashboard" button |
| 4 | Dashboard Viewer | Read-only bento grid at `/dashboard/:id` — 4 hardcoded widget cards, "Edit Dashboard" button |
| 5 | Dashboard Editor | Edit mode at `/dashboard/:id/edit` — drag overlays, "Save Changes"/"Exit Edit" header |
| 6 | Widget Modal | Two-step modal: pick widget type → pick layout scale |

## Context
The three route pages exist as stubs. Before building any page content, we need a shared layout shell that wraps all pages: a fixed left sidebar for navigation and a sticky top header. This is the visual frame every future step will build inside.

## Mockup Reference
`docs/mockup/stitch_taskara/taskara_dashboard_list/code.html` — contains the exact sidebar, header, and canvas structure to implement.

## Design Decisions
- **Sidebar width:** `w-64` (256px) with labels — the Step 2 overview said "64px" but the mockup is clearly 256px with text labels. Mockup is the source of truth.
- **Routing pattern:** Use a React Router v6 **layout route** (`<Outlet />`) instead of wrapping `<Layout>` around each route — cleaner and idiomatic.
- **Header title:** Static "Taskara" brand name on the left; active nav tab (`Dashboards`) derived from `useLocation()`.
- **User avatar:** Omitted — not needed yet.
- **Sidebar active state:** Determined by `useLocation()` matching the current pathname prefix.
- **No new dependencies** — everything is achievable with Tailwind + react-router-dom already installed.
- **Tailwind v4 font utilities:** `font-heading` / `font-body` do not auto-generate from `--font-family-*` theme tokens in Tailwind v4. Use `[font-family:'Manrope',sans-serif]` arbitrary value instead.

## Color Tokens to Add (`index.css`)
The canvas and cards require tokens not yet defined:

```css
--color-surface-container-low: #eaf1ff;      /* canvas background */
--color-surface-container-lowest: #ffffff;    /* card/widget background */
--color-on-surface-variant: #4d5d73;          /* secondary text, inactive nav */
--color-outline-variant: #9eaec7;             /* subtle borders, dot-grid */
```

Also fix existing token mismatch:
- `--color-primary-container`: mockup uses `#9396ff`, current value is `#6c6de8` — update to `#9396ff`

## What This Step Does

### 1. Add color tokens (`index.css`)
Add the 4 missing tokens above and correct `--color-primary-container`.

### 2. Create `Sidebar` component
File: `src/shared/components/Sidebar.tsx`

Structure (from mockup):
- Fixed left, `h-screen w-64`, `bg-slate-100`, `border-r border-slate-200`, `p-4`
- Brand block: "Taskara" (bold, Inter) + "Dashboard Builder" (11px, uppercase, slate-500)
- Nav items (flex-1): Overview (`dashboard` icon), Data Sources (`database`), Archive (`archive`)
  - Active: `bg-white rounded-xl shadow-sm text-primary` (determined by `useLocation`)
  - Inactive: `text-slate-500 hover:bg-slate-200 rounded-xl`
  - Hover: `hover:translate-x-1 transition-transform`
- Bottom section (mt-auto, border-t): Settings (`settings`), Info (`info`)

### 3. Create `Header` component
File: `src/shared/components/Header.tsx`

Structure (from mockup):
- `sticky top-0 z-50 h-16 flex justify-between items-center px-6`
- Background: `bg-slate-50/80 backdrop-blur-xl`
- Left: app title "Taskara" (bold) + active section tab ("Dashboards") derived from route
- Right: search input (rounded-full, `bg-slate-100`, search icon), notifications button, settings button

### 4. Create `Layout` component
File: `src/shared/components/Layout.tsx`

```tsx
export function Layout() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden ml-64">
        <Header />
        <div className="flex-1 overflow-y-auto p-10 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
```

### 5. Update `App.tsx` to use layout route
Wrap all three routes under a parent layout route:

```tsx
<Route element={<Layout />}>
  <Route path="/" element={<DashboardListPage />} />
  <Route path="/dashboard/:id" element={<DashboardViewerPage />} />
  <Route path="/dashboard/:id/edit" element={<DashboardEditorPage />} />
</Route>
```

## Files Modified / Created
| File | Change |
|------|--------|
| `src/frontend/src/index.css` | Add 4 color tokens, fix primary-container, add dot-grid CSS class |
| `src/frontend/src/shared/components/Layout.tsx` | New — layout wrapper with Outlet and dot-grid canvas |
| `src/frontend/src/shared/components/Sidebar.tsx` | New — fixed left nav |
| `src/frontend/src/shared/components/Header.tsx` | New — sticky top bar |
| `src/frontend/src/App.tsx` | Wrap routes in layout route |

## Verification
1. `npm run dev` — all three routes render with sidebar and header visible
2. Navigating between `/`, `/dashboard/1`, `/dashboard/1/edit` — active nav item updates in sidebar
3. Header "Dashboards" tab is active when on any dashboard route
4. Canvas content (stub text) scrolls while sidebar and header stay fixed
5. `npm run lint` passes
6. `npm run build` passes

## After Verification
- Commit and open PR against `main`
- Archive this session plan to `docs/plans/0004-frontend-ui-step2-layout-shell.md`
