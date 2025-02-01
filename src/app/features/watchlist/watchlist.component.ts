import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WatchlistService } from '../../services/watchlist.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-watchlist',
  imports: [
    CommonModule,
    MovieCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {
  watchlistMovies: any[] = [];
  isLoading: boolean = true;
  private watchlistSubscription?: Subscription;

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {
    this.watchlistSubscription = this.watchlistService.watchlist$.subscribe(movies => {
      this.watchlistMovies = movies;
      this.isLoading = false;
    });
  }

  removeFromWatchlist(movieId: number) {
    this.watchlistService.removeFromWatchlist(movieId);
  }

  ngOnDestroy() {
    this.watchlistSubscription?.unsubscribe();
  }

}
