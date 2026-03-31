# Backend Guidelines (.NET 10 / ASP.NET Core)

## Solution & Project Layout

```
src/backend/
├── Taskara.sln
├── Taskara.Api/
│   ├── Controllers/           # API controllers / minimal endpoint groups
│   ├── Application/           # Use cases, services, commands/queries
│   ├── Domain/
│   │   ├── Entities/          # Entities, value objects, domain events
│   │   └── Interfaces/        # Repository/service interfaces (e.g. IOrderRepository)
│   ├── Infrastructure/
│   │   ├── Persistence/       # DbContext, EF Core configuration
│   │   └── Repositories/      # Concrete repository implementations
│   └── Core/                  # Cross-cutting concerns: exceptions, extensions, logging
└── Taskara.Tests/
    ├── Unit/
    └── Integration/
```

## Naming Conventions

| Artifact               | Pattern                         | Example                          |
|------------------------|---------------------------------|----------------------------------|
| Namespace              | `Taskara.Api.<Layer>`           | `Taskara.Api.Application`        |
| Class                  | PascalCase noun                 | `OrderService`                   |
| Interface              | `I` + PascalCase noun           | `IOrderRepository`               |
| Async method           | PascalCase + `Async` suffix     | `GetOrderByIdAsync`              |
| Private field          | `_camelCase`                    | `_orderRepository`               |
| Constant               | PascalCase                      | `MaxRetryCount`                  |

## Dependency Injection

- Register services in `Program.cs` using extension methods (`services.AddApplication()`, etc.).
- Prefer constructor injection; avoid service locator patterns.
- Use `AddScoped` for request-scoped services, `AddSingleton` only for truly stateless singletons.

## API Endpoint Conventions

- All routes are versioned: `/api/v1/<resource>`.
- Use plural, lowercase kebab-case resource names: `/api/v1/task-items`.
- Return `ProblemDetails` (RFC 7807) for all error responses.
- Use minimal APIs for simple endpoints; controllers for complex resource groups.
- Always return typed results (`Results<Ok<T>, NotFound, BadRequest<ProblemDetails>>`).

## Error Handling

- Use a global exception-handling middleware to catch unhandled exceptions.
- Domain validation failures → `400 Bad Request` with problem details.
- Not found → `404 Not Found`.
- Unhandled → `500 Internal Server Error` (never leak stack traces in production).

## Testing

- Framework: **xUnit**
- Unit tests live in `Taskara.Tests/Unit/` and test application/domain logic in isolation.
- Integration tests live in `Taskara.Tests/Integration/` and spin up the full host via `WebApplicationFactory`.
- Use `FluentAssertions` for readable assertions.
- Do not mock the database in integration tests — use a real test database or in-memory SQLite.
