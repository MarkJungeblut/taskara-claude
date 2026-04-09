---
status: Completed
created: 2026-04-09
updated: 2026-04-09
---

# Plan: Create `/plan` skill

## Context

The project has two persistent rules that are easy to miss mid-session: (1) always branch before implementing, and (2) archive completed plans to `docs/plans/`. These exist in memory files and CLAUDE.md but are advisory — a project-scoped skill makes them structural by injecting them into Claude's prompt whenever the workflow is explicitly invoked.

## Approach

Create `.claude/commands/plan.md` (project-scoped, committed to the repo).

The skill prompt should cover the full planning lifecycle:

1. **Ask** the user what they want to build/change (if not already stated).
2. **Branch** — before any implementation begins, determine the branch type from git-workflow.md (`feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/`) and create + check out the branch.
3. **Plan** — enter plan mode, explore the codebase, design the implementation, write a plan file at the Claude plans path, and exit plan mode for approval.
4. **Implement** — execute the approved plan.
5. **Archive** — after all work is complete and tests pass, find the next sequential plan number (last file in `docs/plans/` is `0010-*.md` → next is `0011`), copy the session plan verbatim into `docs/plans/NNNN-<slug>.md`, and set `status: Completed` with accurate dates.

## File to Create

**`.claude/skills/plan/SKILL.md`** — skill prompt contents:

```markdown
Follow this workflow whenever the user wants to plan and implement a change.

## Step 1 — Clarify
If the user hasn't described what they want, ask them now before proceeding.

## Step 2 — Create a branch
Before writing any code, create and check out a new git branch. Use the branch
naming convention from docs/guidelines/git-workflow.md:
  <type>/<short-description>
Types: feat/, fix/, chore/, docs/, refactor/, test/
Example: feat/task-list-api

Do NOT start implementing on main.

## Step 3 — Plan
Enter plan mode. Explore the codebase, design the implementation, and write the
plan to the Claude plans file. Exit plan mode and wait for the user to approve
before writing any code.

## Step 4 — Implement
Execute the approved plan. Follow all guidelines in docs/guidelines/. Keep
changes small and confirm direction between steps per the incremental-changes rule.

## Step 5 — Archive the plan
Once implementation is complete (builds, tests pass, lint clean):
1. List docs/plans/ to find the highest existing plan number.
2. Increment by 1 and create docs/plans/NNNN-<slug>.md.
3. Copy the session plan file content verbatim — do NOT rewrite or recreate it
   from docs/plans/_template.md. The archive must preserve all design decisions,
   context, and detail exactly as implemented.
4. Prepend this frontmatter block:
     ---
     status: Completed
     created: <date work started>
     updated: <today>
     ---
5. Commit the archive file together with any other final tidy-up commits.
```

## Critical Files

- `.claude/commands/plan.md` — new file to create
- `docs/plans/_template.md` — referenced in skill for archive format
- `docs/guidelines/git-workflow.md` — branch naming convention referenced in skill

## Verification

1. Run `/plan` in a new session — Claude should ask for the topic, then offer to create a branch before entering plan mode.
2. After a mock implementation, verify Claude proposes to write to `docs/plans/0011-<slug>.md`.
