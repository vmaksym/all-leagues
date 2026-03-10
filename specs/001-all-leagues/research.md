# Research: Sports Leagues Explorer

## Decision 1: Frontend architecture is Angular standalone SPA with signals-first local state
- Decision: Implement a frontend-only Angular application using standalone components and Angular signals/computed state for UI and filtering state.
- Rationale: Matches required stack (Angular + signals), keeps state flow simple, and avoids unnecessary state management dependencies.
- Alternatives considered: NgRx or other global stores (rejected as unnecessary complexity for current scope); RxJS-only imperative state (rejected for lower template readability compared with signals).

## Decision 2: Styling uses Tailwind 4 utility classes plus minimal component CSS
- Decision: Use Tailwind 4 for spacing, typography scale, responsive grid, sticky layout, and light-theme visual system.
- Rationale: Required by stack and supports clean dashboard consistency with minimal CSS overhead.
- Alternatives considered: Custom CSS-only approach (rejected because Tailwind is a project requirement); large UI frameworks (rejected by constitution dependency policy).

## Decision 3: API integration via Angular HttpClient service layer
- Decision: Create small, focused data services for `all_leagues` and `search_all_seasons` endpoints with typed DTO mapping.
- Rationale: Keeps transport concerns isolated, improves readability, and preserves component simplicity.
- Alternatives considered: Fetch directly from components (rejected due to mixing UI and networking concerns); introducing API client generator (rejected as overkill).

## Decision 4: Badge caching is in-memory, session-scoped by league ID
- Decision: Cache season badge responses in-memory for the active app session only and clear on refresh.
- Rationale: Explicitly clarified in spec; prevents duplicate calls during session without stale long-lived persisted cache.
- Alternatives considered: localStorage persistence (rejected due to stale data risk and unnecessary persistence); TTL cache (rejected as unnecessary for scope).

## Decision 5: Request concurrency uses latest-click-wins behavior
- Decision: Track selected league request token and ignore stale out-of-order badge responses.
- Rationale: Aligns with clarified requirement and prevents UI mismatch when users click rapidly.
- Alternatives considered: request queueing (rejected due to sluggish UX); click blocking while loading (rejected due to interactivity regression).

## Decision 6: Filtering behavior is deterministic and fast
- Decision: Apply case-insensitive substring matching on league name only with 300 ms debounced search input, combined with sport filter.
- Rationale: Explicitly clarified in spec and meets performance/readability goals.
- Alternatives considered: fuzzy matching (rejected as complexity creep); exact/prefix-only matching (rejected as lower usability).

## Decision 7: Error and empty states are inline and non-disruptive
- Decision: Provide explicit loading, empty, and failure states; on badge fetch failure, keep prior badge visible (if any) and show inline error for current selection.
- Rationale: Satisfies clarified behavior and maintains context while staying responsive.
- Alternatives considered: destructive replacement of content on error (rejected due to abrupt UX and loss of context).

## Decision 8: Frontend-only deployment and backend contract assumptions
- Decision: Treat TheSportsDB endpoints as existing backend API dependencies with no server implementation in this repository.
- Rationale: Matches architecture constraints and limits scope to UI/data consumption.
- Alternatives considered: introducing proxy/backend-for-frontend (rejected as out of scope for this feature).
