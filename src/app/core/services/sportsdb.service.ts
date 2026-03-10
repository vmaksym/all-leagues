import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { SPORTS_DB_ENDPOINTS } from '../config/sportsdb.config';
import type { SeasonBadge, SeasonsResponseDto } from '../models/badge.models';
import type { AllLeaguesResponseDto, League } from '../models/league.models';
import { mapLeagueDtos } from './sportsdb.mapper';

@Injectable({ providedIn: 'root' })
export class SportsDbService {
  private readonly http = inject(HttpClient);

  getAllLeagues(): Observable<League[]> {
    return this.http
      .get<AllLeaguesResponseDto>(SPORTS_DB_ENDPOINTS.allLeagues)
      .pipe(map((response) => mapLeagueDtos(response.leagues)));
  }

  getFirstSeasonBadge(leagueId: string): Observable<SeasonBadge | null> {
    return this.http
      .get<SeasonsResponseDto>(SPORTS_DB_ENDPOINTS.seasonsByLeagueId(leagueId))
      .pipe(
        map((response) => {
          const seasons = Array.isArray(response.seasons) ? response.seasons : [];
          const normalized = seasons
            .map((season) => ({
              idLeague: typeof season.idLeague === 'string' ? season.idLeague : leagueId,
              strSeason: typeof season.strSeason === 'string' ? season.strSeason : null,
              strBadge: typeof season.strBadge === 'string' && season.strBadge.trim().length > 0 ? season.strBadge : null
            }))
            .filter((season) => season.idLeague.trim().length > 0);

          if (normalized.length === 0) {
            return null;
          }

          const firstWithBadge = normalized.find((season) => season.strBadge !== null);
          return firstWithBadge ?? normalized[0];
        })
      );
  }
}
