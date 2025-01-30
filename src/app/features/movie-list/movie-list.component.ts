import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { WatchlistService } from '../../services/watchlist.service';
import { Subscription } from 'rxjs';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [
    CommonModule,
    MovieCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  watchlist: any[] = [];
  isLoading: boolean = true;
  private watchlistSubscription: Subscription | null = null;

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit() {
     this.watchlistSubscription = this.watchlistService.watchlist$.subscribe((watchlist) => {
      this.watchlist = watchlist; 
    });

     this.movieService.getMovies().subscribe((data) => {
      this.movies = data.results;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
     if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
  }

 }
