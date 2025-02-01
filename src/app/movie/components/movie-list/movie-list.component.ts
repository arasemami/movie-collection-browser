import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { MovieFacadeService } from '../../services/facade/movie-facade.service';
import { MovieStateService } from '../../services/state/movie-state.service';

@Component({
  selector: 'app-movie-list',
  imports: [
    CommonModule,
    MovieCardComponent,
    LoadingSpinnerComponent,
  ],
  providers: [
    MovieFacadeService,
    MovieStateService
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  private movieFacadeService = inject(MovieFacadeService);
  movies: Movie[] = [];
  isLoading!: boolean;
  componentDestroyed$: Subject<boolean> = new Subject()

  constructor(
  ) {
    this.setSubtractions()
  }

  ngOnInit() {
    this.movieFacadeService.callMovies();
  }

  private setSubtractions() {
    this.movieFacadeService.getMovie$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
      })

      this.movieFacadeService.getLoading$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
}
