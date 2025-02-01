import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../../shared/interfaces/movie.interface';
import { WATCH_LIST_KEY } from '../constant/local-storage-key.const';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private _watchlist$ = new BehaviorSubject<Movie[]>([]);

  constructor() {
    const savedWatchlist = localStorage.getItem(WATCH_LIST_KEY);
    if (savedWatchlist) {
      const movies = JSON.parse(savedWatchlist);
      movies.forEach((movie: Movie) => movie.isWatchList = true);
      this._watchlist$.next(movies);
    }
  }

  getWatchlist$(): Observable<Movie[]> {
    return this._watchlist$.asObservable();
  }

  addToWatchlist(movie: any) {
    const currentList = this._watchlist$.getValue();
    if (!currentList.find(m => m.id === movie.id)) {
      currentList.push(movie);
      this._watchlist$.next(currentList);
      this.saveWatchlist();
    }
  }

  removeFromWatchlist(movieId: number) {
    const updatedList = this._watchlist$.getValue().filter(m => m.id !== movieId);
    this._watchlist$.next(updatedList);
    this.saveWatchlist();
  }

  private saveWatchlist() {
    localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(this._watchlist$.getValue()));
  }
}
