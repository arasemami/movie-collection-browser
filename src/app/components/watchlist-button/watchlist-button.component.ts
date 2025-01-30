import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() movie: any;
  addedToWatchlist: boolean = false;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.watchlistService.watchlist$.subscribe(watchlist => {
      this.addedToWatchlist = watchlist.some(m => m.id === this.movie.id);
    });
  }

  addToWatchlist() {
    debugger
    if (this.addedToWatchlist) {
      this.watchlistService.removeFromWatchlist(this.movie.id);
    } else {
      this.watchlistService.addToWatchlist(this.movie);
    }
    this.addedToWatchlist = !this.addedToWatchlist;
  }

}
