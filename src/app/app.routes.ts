import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/movie-list/movie-list.component').then(m => m.MovieListComponent) },
    { path: 'movie/:id', loadComponent: () => import('./features/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent) },
    { path: 'watchList', loadComponent: () => import('./features/watch-list/watch-list.component').then(m => m.WatchListComponent) },
  ];