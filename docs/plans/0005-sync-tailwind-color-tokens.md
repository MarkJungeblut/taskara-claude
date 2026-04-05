---
status: Completed
created: 2026-04-06
updated: 2026-04-06
---

# Plan: Sync Tailwind Color Tokens with Mockup Design System

## Context

The HTML mockup defines a full Material Design 3 color palette (~40 tokens) via a Tailwind v3 JS config. The React app's `src/frontend/src/index.css` only defined 8 of those tokens, and 4 had **different hex values** from the mockup.

Classes like `bg-surface-container-low`, `text-on-surface-variant`, and `bg-outline-variant` silently produced no styling in the React app. Fixed by syncing all tokens.

## Tasks

- [x] Replace `@theme` color block in `index.css` with full token set from mockup
- [x] Verify lint passes

## Mismatched values corrected

| Token | Was | Now |
|---|---|---|
| `on-primary` | `#ffffff` | `#f4f1ff` |
| `on-surface` | `#1a1c2e` | `#203044` |
| `outline` | `#c8cde8` | `#68788f` |
| `primary-container` | `#6c6de8` | `#9396ff` |

## Files Modified

| File | Change |
|------|--------|
| `src/frontend/src/index.css` | Replaced `@theme` block with full MD3 token set (~50 tokens) |
