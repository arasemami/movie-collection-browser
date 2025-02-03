import { inject, Injectable } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { WATCH_LIST_KEY } from '../../../shared/constant/local-storage-key.const';
import { MovieStateService } from '../state/movie-state.service';
import { MovieService } from '../movie.service';

@Injectable({
  providedIn: 'root',
})

export class MovieFacadeService {
  private _movieStateService = inject(MovieStateService);
  private _movieService = inject(MovieService);
  private _localStorageService = inject(LocalStorageService);
  private errorSubject = new BehaviorSubject<any>(null);

  public getMovie$(): Observable<Movie[]> {
    return this._movieStateService.getMovies$();
  }

  private setMovies(movies: Movie[]): void {
    this._movieStateService.setMovies(movies);
  }

  public callMovies() {
    this.setLoading(true);
    this._movieService.getMovies().pipe(
      catchError(error => {
        this.errorSubject.next(error);
        this.setLoading(false);
        throw error;
      })
    ).subscribe((res: any) => {
      if (res.results) {
        this.setMovies(this.setWatchListMovie(res.results));
      }
      this.setLoading(false);
    });
  }

  private setWatchListMovie(movies: Movie[]): Movie[] {
    const watchlist = this._localStorageService.getItem(WATCH_LIST_KEY);
    movies.forEach(movie => {
      movie.isWatchList = !!watchlist.find((w: { id: number }) => w.id === movie.id);
    });
    return movies;
  }

  private setLoading(value: boolean): void {
    this._movieStateService.setLoading(value);
  }

  public getLoading$(): Observable<boolean> {
    return this._movieStateService.getLoading$();
  }

  public getSelectedMovie$(): Observable<Movie> {
    return this._movieStateService.getSelectedMovie$();
  }

  private setSelectedMovie(movie: Movie): void {
    this._movieStateService.setSelectedMovie(movie);
  }

  public callMovieDetail(id: number): void {
    this.setLoading(true);
    this._movieService.getMovieDetails(id).pipe(
      catchError(error => {
        this.errorSubject.next(error);
        this.setLoading(false);
        return of(null); 
      })
    ).subscribe((res: any) => {
      if (res) {
        const movie = res;
        const watchlist = this._localStorageService.getItem(WATCH_LIST_KEY);
        movie.isWatchList = !!watchlist.find((w: { id: number }) => w.id === movie.id);
        this.setSelectedMovie(movie);
      }
      this.setLoading(false);
    });
  }
  

  public getError$(): Observable<any> {
    return this.errorSubject.asObservable();
  }
}
