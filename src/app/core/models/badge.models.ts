export interface SeasonBadgeDto {
  idLeague?: string | null;
  strSeason?: string | null;
  strBadge?: string | null;
}

export interface SeasonsResponseDto {
  seasons?: SeasonBadgeDto[] | null;
}

export interface SeasonBadge {
  idLeague: string;
  strSeason: string | null;
  strBadge: string | null;
}

export type BadgeStatus = 'ready' | 'empty' | 'error';

export interface BadgeCacheEntry {
  leagueId: string;
  badge: SeasonBadge | null;
  status: BadgeStatus;
  errorMessage: string | null;
  fetchedAt: number;
}
