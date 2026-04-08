---
status: Completed
created: 2026-04-08
updated: 2026-04-08
---

# Plan: Add Widget Dialog

## Context
The dashboard viewer currently shows an empty state with a "Add your first widget" button that does nothing. This plan implements the "Configure Widget" dialog shown in the mockup at `docs/mockup/stitch_taskara/taskara_widget_selection_flow_restored_updated/code.html`. The dialog lets users select a widget type and a layout scale before adding it to the canvas.

## Branch
`feat/add-widget-dialog`

---

## What was built

A 2-step modal dialog triggered by the "Add your first widget" button on `DashboardViewerPage`. The dialog has:

- **Step 1 – Widget Type**: Radio tile grid (Table, Line Chart, Pie Chart, Bar Chart)
- **Step 2 – Layout Scale**: Radio tile pair (Split Canvas = 50%, Full Canvas = 100%)
- **Footer**: "Discard" (closes without action) + "Add to Canvas" primary button (logs config to console; no backend yet)
- **Backdrop**: semi-transparent blur overlay, Escape key closes the dialog

---

## Files changed

### `src/frontend/src/features/dashboards/types.ts`
Added:
```ts
export type WidgetType = 'table' | 'line-chart' | 'pie-chart' | 'bar-chart';
export type WidgetLayoutScale = 'split' | 'full';

export interface WidgetConfig {
  type: WidgetType;
  layoutScale: WidgetLayoutScale;
}
```

### `src/frontend/src/features/dashboards/components/AddWidgetDialog.tsx` (new)
Props: `open`, `onClose`, `onAdd(config)`.
Internal state defaults to `table` / `split`. Escape key handler via `useEffect`. Backdrop click calls `onClose`.

### `src/frontend/src/features/dashboards/pages/DashboardViewerPage.tsx`
- Added `useState<boolean>(false)` for `dialogOpen`
- Connected "Add your first widget" button `onClick` to open the dialog
- `onAdd` handler logs `{ type, layoutScale }` to the console

---

## Verification completed

- [x] Dialog opens on button click
- [x] Widget type tile selection works (radio + visual highlight)
- [x] Layout scale tile selection works
- [x] Escape / Discard / × button close dialog without action
- [x] "Add to Canvas" logs config and closes dialog
- [x] `npm run lint` — no errors
- [x] `npm run test` — passes (no test files yet)
