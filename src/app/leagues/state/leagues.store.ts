import { computed, inject, Injectable, signal } from '@angular/core';
import type { Subscription } from 'rxjs';

import type { BadgeCacheEntry } from '../../core/models/badge.models';
import type { League } from '../../core/models/league.models';
import { alternateNameLabel } from '../../core/services/sportsdb.mapper';
import { SportsDbService } from '../../core/services/sportsdb.service';

@Injectable({ providedIn: 'root' })
export class LeaguesStore {
  private readonly sportsDbService = inject(SportsDbService);

  private readonly allLeagues = signal<League[]>([]);
  private readonly leaguesLoading = signal(false);
  private readonly leaguesError = signal<string | null>(null);

  private readonly searchTerm = signal('');
  private readonly selectedSport = signal('all');
  private readonly selectedLeagueId = signal<string | null>(null);

  private readonly selectedBadgeUrl = signal<string | null>(null);
  private readonly selectedBadgeState = signal<'idle' | 'loading' | 'ready' | 'empty' | 'error'>('idle');
  private readonly selectedBadgeError = signal<string | null>(null);

  private readonly badgeCache = signal<Record<string, BadgeCacheEntry>>({});

  private latestBadgeRequestToken = 0;
  private searchDebounceId: ReturnType<typeof setTimeout> | null = null;
  private badgeSubscription: Subscription | null = null;

  readonly leagues = this.allLeagues.asReadonly();
  readonly isLeaguesLoading = this.leaguesLoading.asReadonly();
  readonly leaguesLoadError = this.leaguesError.asReadonly();
  readonly selectedSportFilter = this.selectedSport.asReadonly();
  readonly selectedLeague = this.selectedLeagueId.asReadonly();
  readonly currentBadgeUrl = this.selectedBadgeUrl.asReadonly();
  readonly currentBadgeState = this.selectedBadgeState.asReadonly();
  readonly currentBadgeError = this.selectedBadgeError.asReadonly();
  readonly searchValue = this.searchTerm.asReadonly();

  readonly sportOptions = computed(() => {
    const sports = new Set<string>();
    for (const league of this.allLeagues()) {
      const value = league.strSport.trim();
      if (value.length > 0) {
        sports.add(value);
      }
    }

    return ['all', ...Array.from(sports).sort((a, b) => a.localeCompare(b))];
  });

  readonly filteredLeagues = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const sportFilter = this.selectedSport();

    return this.allLeagues().filter((league) => {
      const leagueNameMatches = query.length === 0 || league.strLeague.toLowerCase().includes(query);
      const sportMatches = sportFilter === 'all' || league.strSport === sportFilter;
      return leagueNameMatches && sportMatches;
    });
  });

  readonly selectedLeagueDetails = computed(() => {
    const selectedId = this.selectedLeagueId();
    if (!selectedId) {
      return null;
    }

    return this.allLeagues().find((league) => league.idLeague === selectedId) ?? null;
  });

  readonly selectedLeagueAlternateName = computed(() => {
    const selected = this.selectedLeagueDetails();
    if (!selected) {
      return null;
    }

    return alternateNameLabel(selected);
  });

  loadLeagues(): void {
    if (this.leaguesLoading()) {
      return;
    }

    this.leaguesLoading.set(true);
    this.leaguesError.set(null);

    this.sportsDbService.getAllLeagues().subscribe({
      next: (leagues) => {
        this.allLeagues.set(leagues);
        this.leaguesLoading.set(false);
      },
      error: () => {
        this.leaguesError.set('Unable to load leagues right now. Please try again.');
        this.leaguesLoading.set(false);
      }
    });
  }

  setSearchTerm(nextValue: string): void {
    const normalized = nextValue.trimStart();

    if (this.searchDebounceId !== null) {
      clearTimeout(this.searchDebounceId);
    }

    this.searchDebounceId = setTimeout(() => {
      this.searchTerm.set(normalized);
      this.searchDebounceId = null;
    }, 300);
  }

  setSportFilter(value: string): void {
    this.selectedSport.set(value.length > 0 ? value : 'all');
  }

  isBadgeLoadingForLeague(leagueId: string): boolean {
    return this.selectedLeagueId() === leagueId && this.selectedBadgeState() === 'loading';
  }

  badgeForLeague(leagueId: string): string | null {
    if (this.selectedLeagueId() !== leagueId) {
      return null;
    }

    return this.selectedBadgeUrl();
  }

  selectLeague(leagueId: string): void {
    this.selectedLeagueId.set(leagueId);
    this.selectedBadgeError.set(null);

    const cacheEntry = this.badgeCache()[leagueId];
    if (cacheEntry) {
      this.selectedBadgeState.set(
        cacheEntry.status === 'ready' ? 'ready' : cacheEntry.status === 'empty' ? 'empty' : 'error'
      );
      this.selectedBadgeUrl.set(cacheEntry.badge?.strBadge ?? null);
      this.selectedBadgeError.set(cacheEntry.errorMessage);
      return;
    }

    this.selectedBadgeState.set('loading');
    const requestToken = ++this.latestBadgeRequestToken;

    this.badgeSubscription?.unsubscribe();
    this.badgeSubscription = this.sportsDbService.getFirstSeasonBadge(leagueId).subscribe({
      next: (badge) => {
        if (requestToken !== this.latestBadgeRequestToken || this.selectedLeagueId() !== leagueId) {
          return;
        }

        const status = badge?.strBadge ? 'ready' : 'empty';

        this.badgeCache.update((cache) => ({
          ...cache,
          [leagueId]: {
            leagueId,
            badge,
            status,
            errorMessage: null,
            fetchedAt: Date.now()
          }
        }));

        this.selectedBadgeState.set(status === 'ready' ? 'ready' : 'empty');
        this.selectedBadgeUrl.set(badge?.strBadge ?? null);
        this.selectedBadgeError.set(null);
      },
      error: () => {
        if (requestToken !== this.latestBadgeRequestToken || this.selectedLeagueId() !== leagueId) {
          return;
        }

        const errorMessage = 'Unable to load badge for this league.';
        this.badgeCache.update((cache) => ({
          ...cache,
          [leagueId]: {
            leagueId,
            badge: null,
            status: 'error',
            errorMessage,
            fetchedAt: Date.now()
          }
        }));

        this.selectedBadgeState.set('error');
        this.selectedBadgeError.set(errorMessage);
      }
    });
  }
}
