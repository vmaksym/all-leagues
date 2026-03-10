import type { League, LeagueDto } from '../models/league.models';

const UNKNOWN_LEAGUE_NAME = 'Unknown league';
const UNKNOWN_SPORT_NAME = 'Unknown sport';

function normalizeString(value: string | null | undefined): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function mapLeagueDto(dto: LeagueDto): League {
  const idLeague = normalizeString(dto.idLeague) ?? '';

  return {
    idLeague,
    strLeague: normalizeString(dto.strLeague) ?? UNKNOWN_LEAGUE_NAME,
    strSport: normalizeString(dto.strSport) ?? UNKNOWN_SPORT_NAME,
    strLeagueAlternate: normalizeString(dto.strLeagueAlternate),
    strCountry: normalizeString(dto.strCountry)
  };
}

export function mapLeagueDtos(dtos: LeagueDto[] | null | undefined): League[] {
  if (!Array.isArray(dtos)) {
    return [];
  }

  return dtos
    .map(mapLeagueDto)
    .filter((league) => league.idLeague.length > 0);
}

export function alternateNameLabel(league: League): string {
  return league.strLeagueAlternate ?? 'No alternate name';
}
