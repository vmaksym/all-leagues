<!--
Sync Impact Report
- Version change: N/A (template) -> 1.0.0
- Modified principles:
	- Template Principle 1 -> I. Simplicity First
	- Template Principle 2 -> II. Clean Code and Small Components
	- Template Principle 3 -> III. Zero-Testing Policy (NON-NEGOTIABLE)
	- Template Principle 4 -> IV. Performance-First UI
	- Template Principle 5 -> V. Minimal Dependencies
- Added sections:
	- Project Overview
	- Delivery and UI Standards
	- Technology Stack
	- Features
	- UI/UX Guidelines
	- Architecture Rules
	- Dependency Policy
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present)
	- ✅ README.md
- Follow-up TODOs:
	- None
-->

# AllLeagues Constitution

## Core Principles

### I. Simplicity First
Every feature and implementation decision MUST optimize for simplicity. If two
approaches satisfy requirements, the team MUST choose the one with fewer moving
parts, lower cognitive load, and easier maintenance.

Rationale: This project is intentionally small and should remain easy to read,
change, and onboard.

### II. Clean Code and Small Components
Code MUST follow clean code practices: clear naming, single-purpose functions,
small Angular components, and minimal abstraction layers. Large "god"
components, deeply nested conditional rendering, and speculative architecture
MUST NOT be introduced.

Rationale: Readability and long-term maintainability are required project goals.

### III. Zero-Testing Policy (NON-NEGOTIABLE)
This project MUST NOT include tests of any kind. Unit tests, integration tests,
end-to-end tests, test frameworks, test runners, and test-related CI steps are
prohibited. Planning artifacts MUST use manual validation criteria instead of
test plans.

Rationale: Testing is intentionally excluded to keep the scope, tooling, and
workflow minimal for this frontend-only project.

### IV. Performance-First UI
The UI MUST feel fast during filtering and search interactions. Search and
filter updates MUST be instant from the user perspective, and rendering work
MUST avoid unnecessary re-computation and visual jitter.

Rationale: The core user value is fast exploration of league data.

### V. Minimal Dependencies
Dependencies MUST be limited to Angular, Tailwind CSS, and essential Angular
packages. Large UI frameworks, complex state managers, and utility-heavy
libraries MUST NOT be added unless a documented exception is approved through
governance.

Rationale: Dependency restraint protects bundle size, clarity, and upgrade
simplicity.

## Project Overview

The project is a frontend Single Page Application that displays sports leagues
with global search and sidebar filters. It consumes an existing backend API and
does not implement backend services.

Core goals:
- Simplicity
- Clean code
- Minimal dependencies
- Fast UI
- Clear and readable layout

### Technology Stack
- Angular (application framework)
- Tailwind CSS (styling)
- Existing backend API (integration target only)

### Features
1. Display a list of sports leagues.
2. Global search for leagues.
3. Sidebar filters (sport type, country, and related attributes).
4. Instant filtering and search updates.

## Delivery and UI Standards

### UI/UX Guidelines
- The product MUST use a light theme.
- The design MUST follow a clean dashboard style.
- Layout MUST include a sticky header, left sidebar filters, and a main content
	card grid.
- Visual clutter MUST be avoided; spacing and readability take priority.
- Contrast MUST be prioritized over decorative color usage.
- Typography MUST follow:
	- Page and section titles: 24-32px
	- Card titles: 16px
	- Secondary text: 12-14px
- League items MUST be shown as cards in a responsive grid.

### Architecture Rules
- The codebase MUST remain frontend-only.
- The frontend MUST consume the existing backend API and MUST NOT re-implement
	backend logic.
- Components MUST remain small, focused, and readable.
- Data flow for search and filtering MUST stay straightforward and local unless
	complexity clearly demands extraction.

### Dependency Policy
- Allowed dependencies:
	- Angular core ecosystem
	- Tailwind CSS
	- Essential Angular packages required for routing, HTTP, and rendering
- Disallowed by default:
	- Large UI component frameworks
	- Complex state management libraries
	- Non-essential utility libraries
- Any exception MUST include written justification covering user value,
	maintenance cost, and bundle impact.

## Governance

This constitution overrides conflicting local practices and templates.

- Amendment process:
	- Changes MUST be proposed in writing with rationale and impacted sections.
	- Changes MUST include a sync impact check for `.specify/templates/*.md` and
		runtime guidance documents.
	- Changes are adopted when the project owner approves the amendment.
- Versioning policy:
	- MAJOR: Backward-incompatible governance changes or principle removal/rewrite.
	- MINOR: New principle/section or materially expanded guidance.
	- PATCH: Clarifications, wording improvements, and non-semantic edits.
- Compliance review expectations:
	- Every plan, spec, and task breakdown MUST include a constitution check.
	- Reviews MUST verify strict compliance with the Zero-Testing Policy.
	- Dependency additions MUST be validated against the dependency policy.

**Version**: 1.0.0 | **Ratified**: 2026-03-10 | **Last Amended**: 2026-03-10
