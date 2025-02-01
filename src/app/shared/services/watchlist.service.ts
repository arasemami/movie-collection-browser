import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../../shared/interfaces/movie.interface';
import { WATCH_LIST_KEY } from '../constant/local-storage-key.const';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private _watchlists$ = new BehaviorSubject<Movie[]>([]);

  constructor() {
    const savedWatchlist = localStorage.getItem(WATCH_LIST_KEY);
    if (savedWatchlist) {
      const movies = JSON.parse(savedWatchlist);
      movies.forEach((movie: Movie) => movie.isWatckList = true);
      this._watchlists$.next(movies);
    }
  }

  getWatchlist$(): Observable<Movie[]> {
    return this._watchlists$.asObservable();
  }

  addToWatchlist(movie: any) {
    const currentList = this._watchlists$.getValue();
    if (!currentList.find(m => m.id === movie.id)) {
      currentList.push(movie);
      this._watchlists$.next(currentList);
      this.saveWatchlist();
    }
  }

  removeFromWatchlist(movieId: number) {
    const updatedList = this._watchlists$.getValue().filter(m => m.id !== movieId);
    this._watchlists$.next(updatedList);
    this.saveWatchlist();
  }

  private saveWatchlist() {
    localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(this._watchlists$.getValue()));
  }
}
