---
name: plan
description: Full planning workflow — branch, plan mode, implement, archive. Use for any non-trivial change.
---

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
