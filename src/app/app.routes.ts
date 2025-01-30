import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/movie-list/movie-list.component').then(m => m.MovieListComponent) },
    { path: 'movie/:id', loadComponent: () => import('./features/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent) },
    { path: 'watchlist', loadComponent: () => import('./features/watchlist/watchlist.component').then(m => m.WatchlistComponent) },
  ];