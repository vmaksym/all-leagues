export interface LeagueDto {
  idLeague?: string | null;
  strLeague?: string | null;
  strSport?: string | null;
  strLeagueAlternate?: string | null;
  strCountry?: string | null;
}

export interface AllLeaguesResponseDto {
  leagues?: LeagueDto[] | null;
}

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string | null;
  strCountry: string | null;
}
