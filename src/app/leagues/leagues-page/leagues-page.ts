import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { LeagueCardComponent } from '../league-card/league-card';
import { LeaguesStore } from '../state/leagues.store';

@Component({
  selector: 'app-leagues-page',
  imports: [LeagueCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leagues-page.html',
  styleUrl: './leagues-page.css'
})
export class LeaguesPageComponent {
  private readonly store = inject(LeaguesStore);

  readonly leagues = this.store.leagues;
  readonly filteredLeagues = this.store.filteredLeagues;
  readonly sportOptions = this.store.sportOptions;

  readonly isLeaguesLoading = this.store.isLeaguesLoading;
  readonly leaguesLoadError = this.store.leaguesLoadError;
  readonly selectedSport = this.store.selectedSportFilter;
  readonly selectedLeagueId = this.store.selectedLeague;
  readonly searchQuery = this.store.searchValue;

  readonly selectedLeague = this.store.selectedLeagueDetails;
  readonly selectedLeagueAlternateName = this.store.selectedLeagueAlternateName;
  readonly selectedBadgeUrl = this.store.currentBadgeUrl;
  readonly selectedBadgeState = this.store.currentBadgeState;
  readonly selectedBadgeError = this.store.currentBadgeError;

  constructor() {
    effect(() => {
      if (!this.isLeaguesLoading() && this.leagues().length === 0 && !this.leaguesLoadError()) {
        this.store.loadLeagues();
      }
    });
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.store.setSearchTerm(target?.value ?? '');
  }

  onSportFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    this.store.setSportFilter(target?.value ?? 'all');
  }

  onLeagueCardSelect(leagueId: string): void {
    this.store.selectLeague(leagueId);
  }

  isBadgeLoadingForLeague(leagueId: string): boolean {
    return this.store.isBadgeLoadingForLeague(leagueId);
  }

  badgeForLeague(leagueId: string): string | null {
    return this.store.badgeForLeague(leagueId);
  }
}
