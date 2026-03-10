export const SPORTS_DB_API_ROOT = 'https://www.thesportsdb.com/api/v1/json/3';

export const SPORTS_DB_ENDPOINTS = {
  allLeagues: `${SPORTS_DB_API_ROOT}/all_leagues.php`,
  seasonsByLeagueId: (leagueId: string) =>
    `${SPORTS_DB_API_ROOT}/search_all_seasons.php?badge=1&id=${encodeURIComponent(leagueId)}`
};
