import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Movie } from '../../shared/interfaces/movie.interface';
import { WatchlistService } from '../../shared/services/watchlist.service';

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
  private watchlistService = inject(WatchlistService);
  watchlistMovies: Movie[] = [];
  isLoading: boolean = true;
  componentDestroyed$: Subject<boolean> = new Subject()

  constructor(
  ) {
    this.setSubtractions()
  }

  private setSubtractions() {
    this.watchlistService.getWatchlist$().subscribe(movies => {
      this.watchlistMovies = movies;
      this.isLoading = false;
    });
  }

  removeFromWatchlist(movieId: number) {
    this.watchlistService.removeFromWatchlist(movieId);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
}
