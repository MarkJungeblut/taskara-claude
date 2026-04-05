# 0001 — AppHeader: Deviations from Mockup

**Mockup:** `docs/mockup/stitch_taskara/taskara_dashboard_editor_nav_refined/`  
**Component:** `src/frontend/src/shared/components/AppHeader.tsx`

## Decisions

### 1. Removed notification, settings, and user avatar icons
The mockup shows a notification bell, a settings icon, and a user avatar in the top-right corner.

**Decision:** Omit all three. The header only renders action buttons relevant to the current route (Edit / Save Changes / Cancel).

**Reason:** Premature — no auth, notification, or settings features exist yet. Adding icon placeholders would be dead UI.

---

### 2. Button order: Save Changes left, Cancel right
The mockup places "Exit Edit" on the left and "Save Changes" on the right.

**Decision:** Reverse the order — Save Changes on the left, Cancel on the right.

**Reason:** The primary action (save) should be the first button the eye lands on. Cancel is a secondary/escape action and belongs on the right.

---

### 3. Renamed "Exit Edit" to "Cancel"
The mockup labels the secondary editor button "Exit Edit".

**Decision:** Rename to "Cancel".

**Reason:** Shorter and more conventional. "Exit Edit" implies a mode toggle; "Cancel" clearly communicates that unsaved changes are discarded.
