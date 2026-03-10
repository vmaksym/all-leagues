# Integration Contract: TheSportsDB Endpoints

## Purpose
Defines the external API contract consumed by the frontend SPA for league listing and season badge lookup.

## Base
- Provider docs: https://www.thesportsdb.com/free_sports_api
- API root: https://www.thesportsdb.com/api/v1/json/3
- Authentication: None for this feature scope

## Endpoint 1: All Leagues
- Method: GET
- URL: `/all_leagues.php`
- Full URL: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`

### Expected response shape (subset used)
```json
{
  "leagues": [
    {
      "idLeague": "4328",
      "strLeague": "English Premier League",
      "strSport": "Soccer",
      "strLeagueAlternate": "Premier League",
      "strCountry": "England"
    }
  ]
}
```

### Contract rules
- `leagues` may be an empty array; UI must show empty state.
- Missing optional fields (`strLeagueAlternate`, `strCountry`) must not break rendering.
- Required display fields are normalized with safe fallbacks if absent.

## Endpoint 2: Season Badge Lookup
- Method: GET
- URL: `/search_all_seasons.php?badge=1&id=<idLeague>`
- Full URL example: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=4328`

### Expected response shape (subset used)
```json
{
  "seasons": [
    {
      "idLeague": "4328",
      "strSeason": "2025-2026",
      "strBadge": "https://.../badge.png"
    }
  ]
}
```

### Contract rules
- Badge selection uses one available season badge per league for display.
- `strBadge` may be null or missing; UI must show no-badge state.
- Failed requests must surface inline error while preserving previous badge view.

## Client behavior requirements tied to contract
- Cache badge responses in-memory for current session only, keyed by `idLeague`.
- Avoid duplicate badge fetches for cached league selections.
- Enforce latest-click-wins behavior for rapid, overlapping badge requests.
