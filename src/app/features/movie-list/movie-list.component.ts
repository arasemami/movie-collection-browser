import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { WatchlistService } from '../../services/watchlist.service';
import { Subscription } from 'rxjs';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { MovieListFacadeService } from './facade/movie-list-facade.service';
import { MovieListStateService } from './state/movie-list-state.service';
import { Movie } from './interfaces/movie.interface';

@Component({
  selector: 'app-movie-list',
  imports: [
    CommonModule,
    MovieCardComponent,
    LoadingSpinnerComponent,
  ],
  providers: [
    MovieListFacadeService,
    MovieListStateService
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  watchlist: any[] = [];
  isLoading: boolean = true;
  private watchlistSubscription: Subscription | null = null;
  private movieListFacadeService = inject(MovieListFacadeService);

  constructor(
    private watchlistService: WatchlistService,
  ) {
    this.movieListFacadeService.getMovieList$().subscribe((res: Movie[]) => {
      this.movies = res
    })
  }

  ngOnInit() {
    this.watchlistSubscription = this.watchlistService.watchlist$.subscribe((watchlist) => {
      this.watchlist = watchlist;
    });

    this.movieListFacadeService.movieList();
  }

  ngOnDestroy(): void {
    if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
  }

}
