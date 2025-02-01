import { inject, Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';
import { Observable } from 'rxjs';
import { MovieService } from '../../../services/movie.service';
import { MovieListStateService } from '../state/movie-list-state.service';

@Injectable()

export class MovieListFacadeService {
  private _movieListStateService = inject(MovieListStateService)
  private _movieService = inject(MovieService)


  public setMovieList(movieList: Movie[]): void {
    this._movieListStateService.setMovieList(movieList);
  }
  public getMovieList$(): Observable<Movie[]> {
    return this._movieListStateService.getMovieList$();
  }
  public getMovieList(): Movie[] {
    return this._movieListStateService.getMovieList();
  }
  public movieList() {
    this._movieService.getMovies().subscribe((res: any) => {
      if (res.results) {
        this.setMovieList(res.results);
      }
    })
  }
}
