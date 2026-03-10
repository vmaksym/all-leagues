# Tasks: Sports Leagues Explorer

**Input**: Design documents from `/specs/001-all-leagues/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: This project uses implementation and manual validation tasks only.
Do not generate automated test tasks.

**Organization**: Tasks are grouped by user story to enable independent
implementation and manual validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and UI baseline setup

- [ ] T001 Create feature folder scaffolding for leagues flow in src/app/leagues/
- [ ] T002 Define global light-theme dashboard tokens and base utilities in src/styles.css
- [ ] T003 [P] Prepare application shell placeholders for feature mount points in src/app/app.html

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create typed league domain and DTO interfaces from all_leagues contract in src/app/core/models/league.models.ts
- [ ] T005 [P] Create season badge and cache entry interfaces in src/app/core/models/badge.models.ts
- [ ] T006 Create SportsDB API endpoint configuration constants in src/app/core/config/sportsdb.config.ts
- [ ] T007 [P] Implement HTTP integration service for all_leagues and search_all_seasons endpoints in src/app/core/services/sportsdb.service.ts
- [ ] T008 [P] Implement DTO mapping and safe fallback helpers for nullable fields in src/app/core/services/sportsdb.mapper.ts
- [ ] T009 Implement leagues feature signal store skeleton (state, computed, actions) in src/app/leagues/state/leagues.store.ts
- [ ] T010 Wire HttpClient providers and feature-level DI configuration in src/app/app.config.ts

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Browse Leagues List (Priority: P1) 🎯 MVP

**Goal**: Render leagues in a responsive single-page dashboard with safe fallbacks and core UI states

**Independent Validation**: Open app at mobile and desktop widths and confirm leagues render with name, sport, alternate fallback text, and loading/empty/error states.

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create standalone league card component class and inputs in src/app/leagues/league-card/league-card.ts
- [ ] T012 [P] [US1] Build league card markup for name, sport, and alternate fallback text in src/app/leagues/league-card/league-card.html
- [ ] T013 [P] [US1] Add league card styles for clean readable layout in src/app/leagues/league-card/league-card.css
- [ ] T014 [US1] Implement initial leagues load workflow with loading/empty/error state transitions in src/app/leagues/state/leagues.store.ts
- [ ] T015 [US1] Create standalone leagues page container and inject feature store in src/app/leagues/leagues-page/leagues-page.ts
- [ ] T016 [P] [US1] Implement dashboard template with sticky header, sidebar shell, and responsive card grid in src/app/leagues/leagues-page/leagues-page.html
- [ ] T017 [P] [US1] Add responsive dashboard styles for header/sidebar/grid behavior in src/app/leagues/leagues-page/leagues-page.css
- [ ] T018 [US1] Register leagues page route and default navigation in src/app/app.routes.ts
- [ ] T019 [US1] Mount routed leagues experience in root app shell in src/app/app.ts

**Checkpoint**: User Story 1 should be fully functional and manually validatable independently.

---

## Phase 4: User Story 2 - Filter Leagues Quickly (Priority: P2)

**Goal**: Provide fast, deterministic combined filtering with 300 ms debounced search and sport selection

**Independent Validation**: Enter mixed-case search terms, change sport filter, and verify combined results plus empty-state behavior update without reload.

### Implementation for User Story 2

- [ ] T020 [US2] Implement 300 ms debounced search input pipeline in feature state actions in src/app/leagues/state/leagues.store.ts
- [ ] T021 [US2] Compute unique sorted sport filter options from loaded leagues in src/app/leagues/state/leagues.store.ts
- [ ] T022 [US2] Implement case-insensitive combined filter computation (search + sport) in src/app/leagues/state/leagues.store.ts
- [ ] T023 [P] [US2] Add search input and sport-select controls bound to store actions in src/app/leagues/leagues-page/leagues-page.html
- [ ] T024 [US2] Render no-results messaging tied to filtered output in src/app/leagues/leagues-page/leagues-page.html
- [ ] T025 [P] [US2] Add filter interaction styles for sidebar and mobile stacking behavior in src/app/leagues/leagues-page/leagues-page.css

**Checkpoint**: User Stories 1 and 2 should both work and be manually validated independently.

---

## Phase 5: User Story 3 - View Season Badge on League Click (Priority: P3)

**Goal**: Load and display season badges on selection with session cache reuse and latest-click-wins concurrency safety

**Independent Validation**: Click leagues rapidly, confirm only latest result renders, re-click same league to verify cache hit/no duplicate fetch, and validate failure/no-badge states.

### Implementation for User Story 3

- [ ] T026 [US3] Extend badge API parsing for season records and first-available badge selection in src/app/core/services/sportsdb.service.ts
- [ ] T027 [US3] Implement in-memory badge cache keyed by league identifier in src/app/leagues/state/leagues.store.ts
- [ ] T028 [US3] Implement latest-click-wins request token handling for overlapping badge requests in src/app/leagues/state/leagues.store.ts
- [ ] T029 [US3] Keep previous badge visible and set inline error state when new badge request fails in src/app/leagues/state/leagues.store.ts
- [ ] T030 [US3] Add league selection event handling and badge panel bindings in container logic in src/app/leagues/leagues-page/leagues-page.ts
- [ ] T031 [P] [US3] Render badge panel UI states (loading, ready, empty, error) in src/app/leagues/leagues-page/leagues-page.html
- [ ] T032 [P] [US3] Add badge panel visual styles for image, placeholders, and inline errors in src/app/leagues/leagues-page/leagues-page.css

**Checkpoint**: All user stories should now be independently functional and manually validatable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T033 [P] Optimize card rendering with stable trackBy and computed minimization in src/app/leagues/leagues-page/leagues-page.ts
- [ ] T034 [P] Add accessibility labels, focus states, and keyboard semantics in src/app/leagues/leagues-page/leagues-page.html
- [ ] T035 [P] Align manual validation script with implemented behavior in specs/001-all-leagues/quickstart.md
- [ ] T036 Run full manual acceptance checklist and capture completion notes in specs/001-all-leagues/checklists/requirements.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on completion of selected user stories

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2, no dependency on other user stories
- **US2 (P2)**: Starts after Phase 2, depends on US1 list rendering surface for filter controls
- **US3 (P3)**: Starts after Phase 2, depends on US1 selection-capable list UI

### Within Each User Story

- UI models/components before container wiring when tasks are marked [P]
- State computation before final template integration
- Story-level checkpoint validation before moving to next priority

### Dependency Graph

- Phase 1 -> Phase 2 -> US1 -> US2 -> US3 -> Phase 6
- US2 and US3 can overlap after US1 base page exists, if team capacity allows

---

## Parallel Execution Opportunities

- **Setup**: T003 can run in parallel with T001-T002
- **Foundational**: T005, T007, and T008 can run in parallel after T004/T006 planning is clear
- **US1**: T011-T013 can run in parallel; T016 and T017 can run in parallel after T015
- **US2**: T023 and T025 can run in parallel after T020-T022 establish state outputs
- **US3**: T031 and T032 can run in parallel after T030 defines bindings
- **Polish**: T033-T035 can run in parallel before final checklist task T036

## Parallel Example: User Story 1

```bash
Task: "T011 [US1] Create standalone league card component class and inputs in src/app/leagues/league-card/league-card.ts"
Task: "T012 [US1] Build league card markup for name, sport, and alternate fallback text in src/app/leagues/league-card/league-card.html"
Task: "T013 [US1] Add league card styles for clean readable layout in src/app/leagues/league-card/league-card.css"
```

## Parallel Example: User Story 2

```bash
Task: "T023 [US2] Add search input and sport-select controls bound to store actions in src/app/leagues/leagues-page/leagues-page.html"
Task: "T025 [US2] Add filter interaction styles for sidebar and mobile stacking behavior in src/app/leagues/leagues-page/leagues-page.css"
```

## Parallel Example: User Story 3

```bash
Task: "T031 [US3] Render badge panel UI states (loading, ready, empty, error) in src/app/leagues/leagues-page/leagues-page.html"
Task: "T032 [US3] Add badge panel visual styles for image, placeholders, and inline errors in src/app/leagues/leagues-page/leagues-page.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate US1 manually using specs/001-all-leagues/quickstart.md flow
5. Demo or ship MVP increment

### Incremental Delivery

1. Setup + Foundational establish stable base
2. Deliver US1 (browse) and validate
3. Deliver US2 (filtering) and validate
4. Deliver US3 (badge interaction + cache/concurrency) and validate
5. Complete polish and checklist sign-off

### Parallel Team Strategy

1. Team completes Phases 1-2 together
2. Then split by scope:
   - Developer A: US1 component/layout work
   - Developer B: US2 state + filter UI
   - Developer C: US3 badge/cache/concurrency
3. Merge at phase checkpoints and run manual validation flow

---

## Notes

- [P] tasks use different files or non-blocking concerns
- [USx] labels provide traceability to user stories in spec.md
- All tasks include explicit file paths and are ready for direct execution
- Automated tests are intentionally omitted per project constitution
