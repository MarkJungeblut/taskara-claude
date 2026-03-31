# AI Collaboration Guidelines

Rules for working with Claude Code in this repository. These apply to every session.

## Plan Mode

- Always use plan mode for any change touching more than one file or involving non-trivial logic.
- Exception: obvious single-line fixes (typos, constant renames).

## Proposing Alternatives

Always note what alternatives were considered and why the recommended approach was chosen. Dialogue is expected and encouraged — the goal is the best outcome, not the first idea.

## Definition of Done

A task is complete only when **all** of the following are true:

- The project **builds** successfully (for the layer(s) touched).
- **All tests pass** — new logic requires new tests.
- **Lint and format checks pass**:
  - Backend: `dotnet csharpier --check .`
  - Frontend: `prettier --check .` and `eslint .`

## Separation of Concerns

1. **Contract-first**: define the API shape (route, request/response types) before writing code on either layer.
2. **Backend-first**: implement and test the API endpoint before writing frontend code that calls it.
3. **Prefer separate PRs** for backend and frontend. Exception: a trivially coupled change (e.g., a new CRUD endpoint + the single component that calls it) may land together.
4. **Never mix backend and frontend changes in the same commit.**

## Test Requirements

All new code requires tests. No exceptions.

| Layer    | Framework                         | Location                            |
|----------|-----------------------------------|-------------------------------------|
| Backend  | xUnit + FluentAssertions          | `Taskara.Tests/Unit/` or `Integration/` |
| Frontend | Vitest + React Testing Library    | Colocated `*.test.tsx` files        |

Test behavior, not implementation. Query by accessible roles/text, not internal state or CSS classes.

## Updating `docs/context.md`

Update it when a new domain concept is introduced or requirements are clarified. Keep it minimal — facts only, no speculation. If it isn't load-bearing context, leave it out.

## Scope

- Implement exactly what was asked — no gold-plating, no unrequested features.
- If something adjacent looks broken or suboptimal, flag it explicitly. Don't fix it silently.

## Incremental Changes

- Prefer small, focused changes over large sweeping ones.
- If a task feels large, break it into steps and confirm the direction after each before continuing.
- When in doubt, do less and ask — a short clarifying exchange is cheaper than a big revert.
