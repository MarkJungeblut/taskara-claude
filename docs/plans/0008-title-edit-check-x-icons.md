---
status: Completed
created: 2026-04-08
updated: 2026-04-08
---

# Plan: Replace Pen Icon with Check/X Icons During Title Editing

## Context
Currently the dashboard title in AppHeader shows a pen icon that triggers inline editing. Once in edit mode, the user commits via Enter/blur or discards via Escape — but there are no visible affordances for these actions. Replacing the pen with a check (confirm) and x (discard) icon pair makes the editing state explicit and easier to use.

## Scope
One file to modify: `src/frontend/src/shared/components/AppHeader.tsx`

---

## Task 0 — Branch already exists

Already on `feat/empty-dashboard-state` — no new branch needed.

---

## Task 1 — Swap pen for check/x icons in edit mode

**File:** `src/frontend/src/shared/components/AppHeader.tsx`

- **View mode** unchanged — pen (`edit`) icon still triggers edit entry
- **Edit mode** — wrap input and two icon buttons in a flex container:
  - Check button (`check` icon): `text-primary hover:text-primary/80 transition-colors` — calls `commitTitle()`
  - X button (`close` icon): `text-slate-400 hover:text-slate-600 transition-colors` — calls `setEditingId(null)` to discard
  - Remove `onBlur` from the input — clicking icon buttons fires blur before click, which would commit before discard could act
  - Keyboard shortcuts (Enter / Escape) still work

---

## Verification

- [x] Click pen icon → input appears with check and x icons to its right
- [x] Click check → title saved, icons gone
- [x] Click x → original title restored, icons gone
- [x] Press Enter → title saved
- [x] Press Escape → original title restored
- [x] `npm run lint` passes
