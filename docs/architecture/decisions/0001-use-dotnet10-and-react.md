# 0001 — Use .NET 10 and React + TypeScript

**Status:** Accepted  
**Date:** 2026-03-31

## Context

We are starting a new full-stack application from scratch. We need to choose a backend framework
and a frontend technology that are well-maintained, have strong type safety, and support a modern
development workflow.

## Decision

- **Backend:** .NET 10 with ASP.NET Core for the REST API layer.
- **Frontend:** React 19 with TypeScript, bundled with Vite.

## Rationale

### Backend
- .NET 10 is the current LTS-aligned release with strong performance characteristics.
- ASP.NET Core provides built-in DI, middleware, OpenAPI support, and minimal-API style routing.
- xUnit is the idiomatic test framework for .NET and integrates cleanly with `dotnet test`.

### Frontend
- React has the largest component ecosystem and broad team familiarity.
- TypeScript provides compile-time safety and better IDE tooling compared to plain JavaScript.
- Vite delivers fast hot-module replacement during development and efficient production builds.

## Consequences

- Teams need .NET SDK 10 and Node.js 22 installed locally.
- CI must run both `dotnet` and `npm` pipelines.
- Future decisions about databases, auth, and deployment are not constrained by this choice.
