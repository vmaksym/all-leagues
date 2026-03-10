import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { League } from '../../core/models/league.models';

@Component({
  selector: 'app-league-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './league-card.html',
  styleUrl: './league-card.css'
})
export class LeagueCardComponent {
  readonly league = input.required<League>();
  readonly selected = input(false);
  readonly loadingBadge = input(false);
  readonly badgeUrl = input<string | null>(null);

  readonly selectedLeague = output<string>();

  onSelect(): void {
    this.selectedLeague.emit(this.league().idLeague);
  }
}
