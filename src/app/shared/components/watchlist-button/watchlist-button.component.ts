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
  styleUrl: './watchlist-button.component.scss'
})
export class WatchlistButtonComponent {
  @Input() movie!: Movie;
  private watchlistService = inject(WatchlistService);

  addToWatchlist() {
    this.movie.isWatckList ?
      this.watchlistService.removeFromWatchlist(this.movie.id) :
      this.watchlistService.addToWatchlist(this.movie);
    this.movie.isWatckList = !this.movie.isWatckList;
  }
}
