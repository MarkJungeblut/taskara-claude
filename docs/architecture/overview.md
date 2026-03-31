# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────┐
│                  Browser                    │
│         React + TypeScript (Vite)           │
│              src/frontend/                  │
└─────────────────┬───────────────────────────┘
                  │ HTTP / REST (JSON)
                  ▼
┌─────────────────────────────────────────────┐
│            ASP.NET Core API                 │
│              .NET 10                        │
│              src/backend/                   │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
        ┌─────────────────┐
        │    Database     │
        │  (TBD)          │
        └─────────────────┘
```

## Component Responsibilities

### Frontend (`src/frontend/`)
- Single-page application served as static files
- Communicates with the backend exclusively via REST API
- Handles all UI state, routing, and user interaction

### Backend (`src/backend/`)
- RESTful HTTP API (versioned under `/api/v1/`)
- Business logic, validation, and persistence
- Authentication / authorization (approach TBD)

### Database
- Storage technology and schema TBD once data model is defined

## Communication Patterns

| Pattern | Usage |
|---------|-------|
| REST / JSON | Primary client-server communication |
| (WebSocket) | TBD — add if real-time features are required |

## Deployment

_To be defined. Describe hosting targets, containerization, and environment promotion strategy._
