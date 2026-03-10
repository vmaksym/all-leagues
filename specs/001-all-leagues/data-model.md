# Data Model: Sports Leagues Explorer

## Entity: League
- Description: Core league record loaded from All Leagues API and displayed in the card grid.
- Fields:
  - idLeague: string (required, unique)
  - strLeague: string (required)
  - strSport: string (required)
  - strLeagueAlternate: string | null (optional)
  - strCountry: string | null (optional, present when API provides it; used for potential sidebar filter expansion)
- Validation rules:
  - `idLeague` must be present and non-empty.
  - `strLeague` and `strSport` fallback to safe display placeholders if missing.
  - `strLeagueAlternate` can be null/empty and must render with fallback text.
- Relationships:
  - One League can have zero or many season records in badge lookup responses.

## Entity: SportFilterOption
- Description: Distinct sport value derived from loaded leagues.
- Fields:
  - value: string (required, unique)
  - label: string (required)
- Validation rules:
  - Values are deduplicated and sorted for stable UI.
  - Empty values are excluded.
- Relationships:
  - Each option maps to many leagues with matching `strSport`.

## Entity: SeasonBadge
- Description: Badge metadata from season lookup endpoint for a selected league.
- Fields:
  - idLeague: string (required)
  - strSeason: string | null
  - strBadge: string | null (image URL)
- Validation rules:
  - `strBadge` can be null; UI must show no-badge state.
  - Multiple seasons may exist; UI uses first available badge according to feature assumption.
- Relationships:
  - Many SeasonBadge records may map to one League.

## Entity: BadgeCacheEntry
- Description: Session-scoped in-memory cache entry keyed by league identifier.
- Fields:
  - leagueId: string (required, key)
  - badge: SeasonBadge | null
  - status: 'ready' | 'empty' | 'error'
  - errorMessage: string | null
  - fetchedAt: number (epoch ms for diagnostics)
- Validation rules:
  - Cache exists in memory only and resets on page refresh.
  - Duplicate fetches for cached `leagueId` are avoided.
- Relationships:
  - One BadgeCacheEntry belongs to one League.

## Derived View Model: LeagueCardView
- Description: UI-facing projection for card rendering.
- Fields:
  - leagueId: string
  - title: string
  - sport: string
  - alternateNameText: string
  - isSelected: boolean
  - badgeUrl: string | null
  - badgeState: 'idle' | 'loading' | 'ready' | 'empty' | 'error'
  - badgeErrorText: string | null

## State Transitions (badge panel)
1. idle -> loading: User selects league without cached entry.
2. loading -> ready: Badge response contains usable badge URL.
3. loading -> empty: Response has no badge data.
4. loading -> error: Request fails; previous displayed badge remains, inline error shown.
5. any -> ready/empty/error (cached): Re-selecting league resolves from cache without network call.
6. loading(old) + loading(new): If responses return out of order, only latest selected league response updates active UI state.
