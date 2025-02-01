import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { WatchlistButtonComponent } from '../../../shared/components/watchlist-button/watchlist-button.component';
import { MovieFacadeService } from '../../services/facade/movie-facade.service';
import { MovieStateService } from '../../services/state/movie-state.service';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from '../../../shared/interfaces/movie.interface';

@Component({
  selector: 'app-movie-detail',
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    WatchlistButtonComponent

  ],
  providers: [
    MovieFacadeService,
    MovieStateService
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  private movieFacadeService = inject(MovieFacadeService);
  private _activatedRoute = inject(ActivatedRoute);
  componentDestroyed$: Subject<boolean> = new Subject()
  movieId!: number;
  isLoading!: boolean;
  movie!: Movie;

  constructor(
  ) {
    this.setSubtractions()
  }

  ngOnInit(): void {
    this.movieId = this._activatedRoute.snapshot.paramMap.get('id') as any;
    if (this.movieId)
      this.movieFacadeService.callMovieDetail(this.movieId);
  }

  private setSubtractions() {
    this.movieFacadeService.getSelectedMovie$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((movie: Movie) => {
        this.movie = movie;
      });

    this.movieFacadeService.getLoading$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      })
  }
}
