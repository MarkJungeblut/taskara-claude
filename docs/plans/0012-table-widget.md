---
status: Completed
created: 2026-04-09
updated: 2026-04-09
---

# Plan: Table Widget on Dashboard Canvas

## Context

The `AddWidgetDialog` is complete and can produce a `WidgetConfig` (type + layout scale). The `DashboardViewerPage` currently only logs the config to the console — nothing renders. This plan wires up the dialog result to actually render a `TableWidget` on the canvas, supporting both `split` (50% width) and `full` (100% width) scales. Backend does not exist yet; all data is mocked.

---

## Steps

### 1. Extend `types.ts` — Add `WidgetInstance`

File: `src/frontend/src/features/dashboards/types.ts`

Add after `WidgetConfig`:

```ts
export interface WidgetInstance {
  id: string;
  type: WidgetType;
  layoutScale: WidgetLayoutScale;
}
```

---

### 2. Extend `mockData.ts` — Add employee data

File: `src/frontend/src/features/dashboards/mockData.ts`

Add after `MOCK_DASHBOARDS`:

```ts
export type EmployeeStatus = 'Active' | 'On Leave' | 'Contract' | 'Remote';

export interface Employee {
  id: string;
  name: string;
  department: string;
  startDate: string; // ISO date, e.g. "2021-03-15T00:00:00"
  status: EmployeeStatus;
}

export const MOCK_EMPLOYEES: Employee[] = [ /* 8 realistic records */ ];
```

Use `T00:00:00` suffix on dates to force local-time parsing and avoid off-by-one-day issues in negative-UTC timezones.

---

### 3. Create `TableWidget.tsx`

File: `src/frontend/src/features/dashboards/components/TableWidget.tsx`

Props: `{ layoutScale: WidgetLayoutScale }`

- Card wrapper: `bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col`
- Header: icon (`table_rows`) + "Team Directory" title + record count
- `split` scale → 3 columns: Name, Department, Status
- `full` scale → 4 columns: Name, Department, Start Date, Status
- Start Date formatted with `Intl.DateTimeFormat('en-GB', { day:'2-digit', month:'short', year:'numeric' })`
- Alternating row backgrounds: `bg-surface-container-lowest` / `bg-surface/40`
- `overflow-x-auto` wrapper around `<table>` to prevent overflow in split layout
- Status badge: inline `StatusBadge` helper using design-system token classes:
  - Active → `bg-secondary/10 text-secondary`
  - Remote → `bg-primary/10 text-primary`
  - On Leave → `bg-tertiary/10 text-tertiary`
  - Contract → `bg-error/10 text-error`
- Footer: column count + "Mock data" label

---

### 4. Create `WidgetCanvas.tsx`

File: `src/frontend/src/features/dashboards/components/WidgetCanvas.tsx`

Props: `{ widgets: WidgetInstance[] }`

```tsx
<div className="grid grid-cols-2 gap-6 p-6">
  {widgets.map(widget => (
    <div key={widget.id} className={widget.layoutScale === 'full' ? 'col-span-2' : 'col-span-1'}>
      {widget.type === 'table' && <TableWidget layoutScale={widget.layoutScale} />}
    </div>
  ))}
</div>
```

---

### 5. Update `DashboardViewerPage.tsx`

File: `src/frontend/src/features/dashboards/pages/DashboardViewerPage.tsx`

**State:**
```ts
const [widgets, setWidgets] = useState<WidgetInstance[]>([]);
```

**`handleWidgetAdd`:**
```ts
function handleWidgetAdd(config: WidgetConfig) {
  setWidgets(prev => [...prev, { id: crypto.randomUUID(), ...config }]);
}
```

**Structural change** — outer div: remove `items-center justify-center bg-surface`, keep `flex-1 flex flex-col min-h-0`. The dotted background moves to the inner state divs.

**Empty state** (unchanged visually, `widgets.length === 0`):
```tsx
<div className="flex-1 flex items-center justify-center bg-surface min-h-0" style={dottedBg}>
  {/* ...existing empty state content... */}
</div>
```

**Canvas state** (`widgets.length > 0`):
```tsx
<>
  {/* Toolbar strip */}
  <div className="flex justify-between items-center px-6 py-3 border-b border-outline-variant/10 bg-surface-container-low/80 backdrop-blur-sm shrink-0">
    <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
      {widgets.length} widget{widgets.length !== 1 ? 's' : ''}
    </span>
    <button onClick={() => setDialogOpen(true)} className="...same style as existing button...">
      <span className="material-symbols-outlined text-[16px]">add</span>
      Add Widget
    </button>
  </div>

  {/* Scrollable canvas */}
  <div className="flex-1 overflow-y-auto min-h-0" style={dottedBg}>
    <WidgetCanvas widgets={widgets} />
  </div>
</>
```

`AddWidgetDialog` stays at the bottom, outside the conditional.

---

## Critical Files

| File | Action |
|---|---|
| `src/frontend/src/features/dashboards/types.ts` | Add `WidgetInstance` |
| `src/frontend/src/features/dashboards/mockData.ts` | Add `Employee`, `EmployeeStatus`, `MOCK_EMPLOYEES` |
| `src/frontend/src/features/dashboards/pages/DashboardViewerPage.tsx` | Wire state, bifurcated render, toolbar |
| `src/frontend/src/features/dashboards/components/WidgetCanvas.tsx` | **New** — grid layout + widget dispatch |
| `src/frontend/src/features/dashboards/components/TableWidget.tsx` | **New** — table component with split/full logic |

No changes needed to `AddWidgetDialog.tsx`, `Layout.tsx`, `AppHeader.tsx`, or `App.tsx`.

---

## Verification

1. `npm run dev` in `src/frontend/`
2. Navigate to any dashboard (`/dashboard/:id`)
3. Click "Add your first widget" → select Table + split → "Add to Canvas" → table renders at ~50% width with 3 columns
4. Click "Add Widget" in toolbar → select Table + full → table renders full-width with 4 columns (Start Date visible)
5. Add a mix of split/full widgets and confirm the grid layout arranges them correctly
6. `npm run lint` — no TypeScript errors
7. `npm run test` — existing tests still pass
