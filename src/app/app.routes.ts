import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./movie/components/movie-list/movie-list.component').then(m => m.MovieListComponent) },
  { path: 'movie/:id', loadComponent: () => import('./movie/components/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent) },
  { path: 'watchlist', loadComponent: () => import('./watchlist/components/watchlist.component').then(m => m.WatchlistComponent) },
  { path: '**', loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent) }

];