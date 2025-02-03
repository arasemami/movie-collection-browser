import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-watchlist-button',
  imports: [
    CommonModule
  ],
  templateUrl: './watchlist-button.component.html',
})
export class WatchlistButtonComponent {
  @Input() movie!: Movie;
  private watchlistService = inject(WatchlistService);

  addToWatchlist() {
    this.movie.isWatchList ?
      this.watchlistService.removeFromWatchlist(this.movie.id) :
      this.watchlistService.addToWatchlist(this.movie);
    this.movie.isWatchList = !this.movie.isWatchList;
  }
}
