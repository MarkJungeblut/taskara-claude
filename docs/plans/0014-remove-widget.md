---
status: Completed
created: 2026-04-09
updated: 2026-04-09
---

# Plan: Remove Widget

## Context

Users currently have no way to delete widgets from the dashboard. The edit pen button covers renaming and layout changes, but removal is missing entirely. We want a dedicated trash icon in the widget header that triggers a confirmation dialog before deleting — keeping edit and delete as distinct actions with an accidental-deletion guard.

## Approach

4 files touched: 1 new component, 3 existing files updated. State lives in `DashboardViewerPage`, flows down through `WidgetCanvas` → `TableWidget` as a callback.

---

## Step 1 — Create `RemoveWidgetDialog.tsx`

**File:** `src/frontend/src/features/dashboards/components/RemoveWidgetDialog.tsx` *(new)*

Props:
```ts
interface RemoveWidgetDialogProps {
  open: boolean;
  widgetTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}
```

Behaviour:
- Return `null` when `open` is false
- `useEffect` registers `keydown` → `onClose` on Escape (same pattern as `AddWidgetDialog`)
- Backdrop `onClick={onClose}`

Visual structure (match `AddWidgetDialog` token-for-token):
- Outer: `fixed inset-0 z-[100] flex items-center justify-center p-4`
- Backdrop: `absolute inset-0 bg-on-background/60 backdrop-blur-md`
- Panel: `relative w-full max-w-md bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-2xl flex flex-col`
- Header (`bg-white px-8 pt-8 pb-6`):
  - `h2` "Remove Widget" — `text-3xl font-headline font-extrabold tracking-tight text-on-surface`
  - Close `×` button top-right calling `onClose`
  - `p` body text: `"Are you sure you want to remove **{widgetTitle}**? This action cannot be undone."`
- Body (`px-8 py-6`): large centered `delete_forever` icon, `text-error text-5xl`
- Footer (`px-8 py-6 bg-surface-container-low flex justify-end items-center gap-4`):
  - Cancel: `text-on-surface-variant` plain text button → `onClose`
  - Remove: `bg-error text-on-error px-10 py-4 rounded-2xl font-label font-extrabold shadow-xl shadow-error/30 hover:scale-[1.02] active:scale-[0.98]` → `onConfirm`, with `delete` icon

No internal state — the component is a pure presentation component.

---

## Step 2 — Update `DashboardViewerPage.tsx`

**File:** `src/frontend/src/features/dashboards/pages/DashboardViewerPage.tsx`

Changes:
1. Import `RemoveWidgetDialog`
2. Add state: `const [deletingWidget, setDeletingWidget] = useState<WidgetInstance | null>(null)`
3. Add handler (after `handleWidgetEdit`):
   ```ts
   function handleWidgetDelete() {
     const target = deletingWidget;
     if (!target) return;
     setWidgets((prev) => prev.filter((w) => w.id !== target.id));
     setDeletingWidget(null);
   }
   ```
4. Pass `onDeleteWidget={setDeletingWidget}` to `<WidgetCanvas>`
5. Mount dialog after `<AddWidgetDialog>`:
   ```tsx
   <RemoveWidgetDialog
     open={deletingWidget !== null}
     widgetTitle={deletingWidget?.title ?? ''}
     onClose={() => setDeletingWidget(null)}
     onConfirm={handleWidgetDelete}
   />
   ```

---

## Step 3 — Update `WidgetCanvas.tsx`

**File:** `src/frontend/src/features/dashboards/components/WidgetCanvas.tsx`

Changes:
1. Add `onDeleteWidget: (widget: WidgetInstance) => void` to props interface
2. Destructure the new prop
3. Pass `onDelete={() => onDeleteWidget(widget)}` to `<TableWidget>` (mirrors existing `onEdit` prop)

---

## Step 4 — Update `TableWidget.tsx`

**File:** `src/frontend/src/features/dashboards/components/TableWidget.tsx`

Changes:
1. Add `onDelete: () => void` to `TableWidgetProps`
2. Destructure the new prop
3. Add delete button after the existing edit button in the header:
   ```tsx
   <button
     onClick={onDelete}
     title="Remove widget"
     className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-error/10 text-on-surface-variant hover:text-error"
   >
     <span className="material-symbols-outlined text-[16px]">delete</span>
   </button>
   ```
   - Idle state matches the edit button (`text-on-surface-variant`)
   - Hover shows red tint (`hover:bg-error/10 hover:text-error`) to signal destructive action

---

## Data Flow

```
DashboardViewerPage
  deletingWidget state ──────────────────────► RemoveWidgetDialog
  setDeletingWidget ──► WidgetCanvas (onDeleteWidget)
                              │
                        TableWidget (onDelete)
                              │
                         [trash click]
                              │
                        setDeletingWidget(widget) ──► dialog opens
                                                            │
                                                    [Remove clicked]
                                                            │
                                                   handleWidgetDelete()
                                                   filters widget out of state
                                                   setDeletingWidget(null) ──► dialog closes
```

---

## Verification

1. `npm run dev` — load the dashboard, add a widget
2. Trash icon visible in widget header next to pen icon
3. Hover trash → red tint, hover pen → neutral tint
4. Click trash → confirmation dialog opens with correct widget title
5. Escape / backdrop click / Cancel → dialog closes, widget intact
6. Click Remove → dialog closes, widget gone from canvas
7. `npm run lint` — no lint errors
8. `npm run test` — existing tests pass
