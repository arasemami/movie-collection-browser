import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { MovieFacadeService } from '../../services/facade/movie-facade.service';
import { MovieStateService } from '../../services/state/movie-state.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    MovieCardComponent,
    LoadingSpinnerComponent,
    ReactiveFormsModule, 
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
  filteredMovies: Movie[] = [];
  isLoading!: boolean;
  componentDestroyed$: Subject<boolean> = new Subject();
  
  searchControl = new FormControl('');   

  constructor() {
    this.setSubtractions();
  }

  ngOnInit() {
    this.movieFacadeService.callMovies();
    
    this.searchControl.valueChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe(query => {
      this.filterMovies(query ?? '');   
    });
  }

  private setSubtractions() {
    this.movieFacadeService.getMovie$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
        this.filteredMovies = movies;
      });

    this.movieFacadeService.getLoading$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  private filterMovies(query: string) {
    if (!query || query.trim() === '') {
      this.filteredMovies = this.movies;
    } else {
      const queryLower = query.toLowerCase();
      this.filteredMovies = this.movies.filter(movie => 
        (movie.title && movie.title.toLowerCase().includes(queryLower)) || 
        (movie.genre && movie.genre.toLowerCase().includes(queryLower))
      );
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
