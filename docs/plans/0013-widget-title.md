---
status: Completed
created: 2026-04-09
updated: 2026-04-09
---

# Plan: Widget Title

## Context
Widgets currently have no user-visible name — `TableWidget` hardcodes "Team Directory". Users need to identify and rename widgets on their dashboard. The title should be auto-generated (Docker-style: adjective + type-aware noun) so widgets always have a meaningful default, but editable both at creation time and later via the Configure Widget dialog.

---

## Approach

### 1. Extend types — `types.ts`
Add `title: string` to both `WidgetConfig` and `WidgetInstance`.

### 2. New utility — `utils/generateWidgetTitle.ts`
```
src/frontend/src/features/dashboards/utils/generateWidgetTitle.ts
```
- `ADJECTIVES`: ~20 vivid one-word adjectives (e.g. jolly, brave, nimble, cosmic, vivid…)
- `NOUNS_BY_TYPE: Record<WidgetType, string[]>` — type-aware nouns:
  - `table` → Directory, Register, Roster, Ledger, Catalog
  - `line-chart` → Trend, Trajectory, Timeline, Waveline, Projection
  - `pie-chart` → Breakdown, Composition, Slice, Share, Distribution
  - `bar-chart` → Comparison, Ranking, Benchmark, Tally, Snapshot
- `generateWidgetTitle(type: WidgetType): string` — picks a random adjective + random noun for the type, returns e.g. `"Jolly Directory"`.

### 3. Update `AddWidgetDialog.tsx`
**New props:**
```ts
interface AddWidgetDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (config: WidgetConfig) => void;
  editWidget?: WidgetInstance;   // if set → edit mode
}
```

**State additions:**
- `title: string` — the user-typed value (empty = use placeholder)
- `titlePlaceholder: string` — auto-generated, re-generated when `selectedType` changes

**Behaviour:**
- State is initialized directly from `editWidget` props (no `useEffect`). Parent passes a `key` prop to force remount when switching between add/edit modes.
- When `selectedType` changes (and title is still empty): regenerate `titlePlaceholder`.
- On submit: `config.title = title.trim() || titlePlaceholder` — the placeholder is always committed as a real value.

**Step order (name first — more intuitive):**
1. **Widget Name** — `<input>` with `placeholder={titlePlaceholder}` and `value={title}` / `onChange`; helper text: *"Leave blank to use the suggested name"*
2. **Widget Type** (was Step 1)
3. **Layout Scale** (was Step 2)

Since `titlePlaceholder` depends on `selectedType`, generate the initial placeholder from the default type (`'table'`) on open, and regenerate whenever `selectedType` changes.

**Edit mode differences (when `editWidget` is set):**
- Step 1 widget type cards are rendered with `pointer-events-none opacity-60` — visually disabled, not interactive
- Dialog subtitle changes to *"Adjust the name and layout of your widget."*
- Footer button reads **"Save Changes"** instead of "Add to Canvas"

### 4. Update `TableWidget.tsx`
- Add `title: string` to `TableWidgetProps`
- Add `onEdit: () => void` to `TableWidgetProps`
- Replace hardcoded `"Team Directory"` with `{title}`
- Add an edit icon button in the header (appears on hover using `group/header` + `opacity-0 group-hover/header:opacity-100`):
  ```tsx
  <button onClick={onEdit} title="Edit widget" className="...">
    <span className="material-symbols-outlined text-[16px]">edit</span>
  </button>
  ```

### 5. Update `WidgetCanvas.tsx`
- Add `onEditWidget: (widget: WidgetInstance) => void` to `WidgetCanvasProps`
- Pass `title={widget.title}` and `onEdit={() => onEditWidget(widget)}` to `<TableWidget>`

### 6. Update `DashboardViewerPage.tsx`
- Add `editingWidget: WidgetInstance | null` state (default `null`)
- `handleWidgetAdd(config: WidgetConfig)`: include `title` from config (no change needed since config now carries `title`)
- `handleWidgetEdit(config: WidgetConfig)`: update matching widget in array by `editingWidget.id`
  ```ts
  const target = editingWidget;
  if (!target) return;
  setWidgets((prev) => prev.map(w =>
    w.id === target.id ? { ...w, ...config } : w
  ));
  setEditingWidget(null);
  ```
- Pass `onEditWidget={setEditingWidget}` to `<WidgetCanvas>`
- Expand `<AddWidgetDialog>` usage:
  ```tsx
  <AddWidgetDialog
    key={editingWidget?.id ?? 'new'}
    open={dialogOpen || editingWidget !== null}
    onClose={() => { setDialogOpen(false); setEditingWidget(null); }}
    onAdd={editingWidget ? handleWidgetEdit : handleWidgetAdd}
    editWidget={editingWidget ?? undefined}
  />
  ```

---

## Files to change
| File | Change |
|------|--------|
| `src/frontend/src/features/dashboards/types.ts` | Add `title` to `WidgetConfig` + `WidgetInstance` |
| `src/frontend/src/features/dashboards/utils/generateWidgetTitle.ts` | **New** — title generator |
| `src/frontend/src/features/dashboards/components/AddWidgetDialog.tsx` | Step 3 (title input), edit mode |
| `src/frontend/src/features/dashboards/components/TableWidget.tsx` | `title` + `onEdit` props, hover edit button |
| `src/frontend/src/features/dashboards/components/WidgetCanvas.tsx` | Pass `title` + `onEditWidget` callback |
| `src/frontend/src/features/dashboards/pages/DashboardViewerPage.tsx` | `editingWidget` state, wire edit flow |

---

## Verification
1. `npm run dev` — add a widget; verify auto-generated title appears in header with correct type-aware noun
2. Clear the name input → verify placeholder shows the generated name greyed out; submit → verify the placeholder name is saved
3. Type a custom name → submit → verify it appears in the widget header
4. Click the edit (pencil) icon on the widget → dialog reopens; widget type is greyed/disabled; title and scale pre-filled
5. Change scale and name → "Save Changes" → widget updates in place
6. `npm run lint` and `npm run test` pass
