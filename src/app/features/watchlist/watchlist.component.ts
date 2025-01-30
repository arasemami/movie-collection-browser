import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  imports: [
    CommonModule
  ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {
  watchlistMovies: any[] = [];
  private watchlistSubscription: Subscription | undefined;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.watchlistSubscription = this.watchlistService.getWatchlist().subscribe(movies => {
      this.watchlistMovies = movies;
    });
  }


  removeFromWatchlist(movieId: number) {
    this.watchlistService.removeFromWatchlist(movieId);
  }

  ngOnDestroy() {
    if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
  }

}
