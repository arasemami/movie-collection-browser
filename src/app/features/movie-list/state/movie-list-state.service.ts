import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';

@Injectable()

export class MovieListStateService {
  private _movieList$ = new BehaviorSubject<Movie[]>([])

  public setMovieList(movieList: Movie[]): void {
    this._movieList$.next(movieList);
  }
  public getMovieList$(): Observable<Movie[]> {
    return this._movieList$.asObservable();
  }
  public getMovieList(): Movie[] {
    return this._movieList$.getValue();
  }

}
