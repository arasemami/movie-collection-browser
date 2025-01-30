import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public watchlist$ = this.watchlistSubject.asObservable();

  constructor() {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      this.watchlistSubject.next(JSON.parse(savedWatchlist));
    }
  }

  getWatchlist() {
    return this.watchlistSubject.asObservable();
  }

  addToWatchlist(movie: any) {
    const currentList = this.watchlistSubject.getValue();
    if (!currentList.find(m => m.id === movie.id)) {
      currentList.push(movie);
      this.watchlistSubject.next(currentList);
      this.saveWatchlist();
    }
  }

  removeFromWatchlist(movieId: number) {
    const updatedList = this.watchlistSubject.getValue().filter(m => m.id !== movieId);
    this.watchlistSubject.next(updatedList);
    this.saveWatchlist();
  }

  private saveWatchlist() {
    localStorage.setItem('watchlist', JSON.stringify(this.watchlistSubject.getValue()));
  }

  isInWatchlist(movie: any): boolean {
    return this.watchlistSubject.value.some(m => m.id === movie.id);
  }

}
