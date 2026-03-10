import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./leagues/leagues-page/leagues-page').then((module) => module.LeaguesPageComponent)
	}
];
