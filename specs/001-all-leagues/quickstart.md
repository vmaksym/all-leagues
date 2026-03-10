# Quickstart: Sports Leagues Explorer

## Prerequisites
- Node.js 20+
- npm 11+

## Install
```bash
npm install
```

## Run the app
```bash
npm start
```

Default local URL is typically:
- http://localhost:4200

## Manual validation flow (no automated tests)

1. Open the app on desktop width and confirm:
- Sticky header is visible.
- Left sidebar contains filters.
- Main area shows a responsive card grid.

2. Verify leagues load:
- League cards render name, sport, and alternate name/fallback text.
- Empty and loading states render clearly when applicable.

3. Verify filtering behavior:
- Enter search text and confirm case-insensitive substring filtering on league name.
- Confirm search applies after roughly 300 ms debounce.
- Select sport filter and verify combined filtering with search.
- Confirm empty-state message appears when no results match.

4. Verify badge interaction and cache:
- Click a league and confirm season badge appears when available.
- Click the same league again and confirm no duplicate fetch is needed (cache hit behavior).
- Click different leagues rapidly and confirm latest-click-wins rendering.

5. Verify error behavior:
- Simulate badge request failure (network offline or blocked request) and confirm previous badge remains visible while inline error is shown for current selection.

6. Verify responsiveness:
- Check mobile, tablet, and desktop widths for usable layout and no horizontal overflow.

## Build
```bash
npm run build
```
