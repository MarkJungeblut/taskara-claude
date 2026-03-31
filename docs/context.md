# Project Context

> Update this file as requirements are defined. It is the primary source of truth for both
> humans and Claude when reasoning about what this application does and why.

## What This Application Does

Taskara is a **local, read-only dashboard tool** for Obsidian markdown vaults. It reads markdown files with YAML frontmatter from a configured local vault path and lets the user build dashboards to visualise and explore their data — without relying on any cloud service.

The user manages their files (employees, meeting minutes, tasks, workflows) in Obsidian. Taskara provides the dashboard layer: no file creation or editing.

## Key Terminology / Domain Concepts

| Term | Meaning |
|------|---------|
| **Vault** | A local directory of markdown files, managed by Obsidian |
| **Frontmatter** | YAML block at the top of a markdown file (`--- ... ---`) |
| **Type** | A required frontmatter property (`type: employee`) that acts as the entity/table name |
| **Property** | Any YAML frontmatter key-value pair on a file |
| **Property types** | `string`, `number`, `list` (of strings), `checkbox` (bool), `date`, `tags` |
| **Dashboard** | A named collection of widgets |
| **Widget** | A single visualisation unit — either a Table or a Chart |
| **Table widget** | Displays files of a given type as rows, with selected properties as columns; sortable |
| **Chart widget** | Visualises a single property of a given type (e.g. distribution, counts); includes a legend identifying which files belong to each segment |

## Dashboard Layout

- A dashboard is a vertical stack of rows.
- Each row contains **1 or 2 widgets**.
- Two widgets in a row sit side by side at 50% width each.
- A single widget in a row spans the full width.
- All widgets have a fixed height.

## Widget Configuration

**Table widget**
- User picks a `type` (e.g. `employee`)
- User selects one or more frontmatter properties to show as columns
- Rows are sortable by any column

**Chart widget**
- User picks a `type`
- User selects exactly **one** frontmatter property to aggregate
- Supported chart types: Pie, Bar, Line (others TBD)
- Chart includes a legend identifying which files belong to each segment
- Aggregation: counts for now (e.g. count of files where `appraisal_talk: false`)

## Settings

- **Vault path**: a single directory path configured once in app settings; the app reads all `.md` files recursively from this path.
- Future: folder picker UI to change the vault path.

## Tech Stack Rationale

| Choice            | Rationale                                                       |
|-------------------|-----------------------------------------------------------------|
| .NET 10           | Mature, performant, strong typing, excellent tooling            |
| ASP.NET Core      | Industry-standard web API framework in the .NET ecosystem       |
| React + TypeScript| Component model, large ecosystem, type safety at the UI layer   |
| Vite              | Fast dev server and build tooling for modern React projects     |

## External Dependencies

- **Local filesystem**: the only external dependency — the configured vault directory.
- No cloud services, no database (files are the source of truth).
- Intended to run locally or inside a Docker container with the vault directory mounted.
