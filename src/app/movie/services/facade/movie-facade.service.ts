import { inject, Injectable } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { WATCH_LIST_KEY } from '../../../shared/constant/local-storage-key.const';
import { MovieStateService } from '../state/movie-state.service';
import { MovieService } from '../movie.service';

@Injectable()

export class MovieFacadeService {
  private _movieStateService = inject(MovieStateService)
  private _movieService = inject(MovieService)
  private _localStorageService = inject(LocalStorageService)

  public getMovie$(): Observable<Movie[]> {
    return this._movieStateService.getMovies$();
  }

  private setMovies(movies: Movie[]): void {
    this._movieStateService.setMovies(movies);
  }

  public callMovies() {
    this.setLoading(true);
    this._movieService.getMovies().subscribe((res: any) => {
      if (res.results)
        this.setMovies(this.setWtachListMovie(res.results));
      this.setLoading(false);
    })
  }


  private setWtachListMovie(movies: Movie[]): Movie[] {
    const watchlists = this._localStorageService.getItem(WATCH_LIST_KEY);
    movies.forEach(movie => {
      movie.isWatckList = !!watchlists.find((w: { id: number }) => w.id === movie.id);
    })
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

  public callMovieDetail(id: number) {
    this.setLoading(true);
    this._movieService.getMovieDetails(id).subscribe((res: any) => {
      if (res) {
        const movie = res;
        const watchlists = this._localStorageService.getItem(WATCH_LIST_KEY);
        movie.isWatckList = !!watchlists.find((w: { id: number }) => w.id === movie.id);
        this.setSelectedMovie(movie);
      }
      this.setLoading(false);
    })
  }

}
