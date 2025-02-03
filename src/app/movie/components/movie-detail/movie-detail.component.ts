import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  private movieFacadeService = inject(MovieFacadeService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  
  componentDestroyed$: Subject<boolean> = new Subject();
  movieId!: number;
  isLoading: boolean = true;
  movie!: Movie;

  constructor() {
    this.setSubtractions();
  }

  ngOnInit(): void {
    const movieIdParam = this._activatedRoute.snapshot.paramMap.get('id');
    this.movieId = movieIdParam ? +movieIdParam : NaN;  
  
    if (this.movieId) {
      this.movieFacadeService.callMovieDetail(this.movieId);
    } else {
      this.navigateToNotFound();
    }
  }

  private setSubtractions() {
    this.movieFacadeService.getSelectedMovie$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((movie: Movie) => {
        this.movie = movie;
        this.isLoading = false;
      });

    this.movieFacadeService.getLoading$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });

    this.movieFacadeService.getError$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((error) => {
        if (error) {
          this.navigateToNotFound();
        }
      });
  }
   navigateToNotFound() {
    this._router.navigate(['/not-found']);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
