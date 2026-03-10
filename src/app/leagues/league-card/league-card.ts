import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { League } from '../../core/models/league.models';

@Component({
  selector: 'app-league-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './league-card.html',
  styleUrl: './league-card.css'
})
export class LeagueCardComponent {
  private static readonly accentPalette = [
    '#1DB954',
    '#0F8B8D',
    '#2E7D32',
    '#F59E0B',
    '#EF4444',
    '#2563EB'
  ];

  readonly league = input.required<League>();
  readonly selected = input(false);
  readonly loadingBadge = input(false);
  readonly badgeUrl = input<string | null>(null);

  readonly selectedLeague = output<string>();

  onSelect(): void {
    this.selectedLeague.emit(this.league().idLeague);
  }

  leagueAccentColor(): string {
    const id = this.league().idLeague;
    let hash = 0;

    for (let index = 0; index < id.length; index += 1) {
      hash = (hash << 5) - hash + id.charCodeAt(index);
      hash |= 0;
    }

    const paletteIndex = Math.abs(hash) % LeagueCardComponent.accentPalette.length;
    return LeagueCardComponent.accentPalette[paletteIndex];
  }

  leagueTag(): string {
    return `ID ${this.league().idLeague}`;
  }
}
