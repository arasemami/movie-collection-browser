import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../../../shared/interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})

export class MovieStateService {
  private _movies$ = new BehaviorSubject<Movie[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _selectedMovie$ = new BehaviorSubject<Movie>({} as Movie);

  public setMovies(movies: Movie[]): void {
    this._movies$.next(movies);
  }

  public getMovies$(): Observable<Movie[]> {
    return this._movies$.asObservable();
  }

  public setLoading(value: boolean): void {
    this._loading$.next(value);
  }

  public getLoading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  public setSelectedMovie(movie: Movie): void {
    this._selectedMovie$.next(movie);
  }

  public getSelectedMovie$(): Observable<Movie> {
    return this._selectedMovie$.asObservable();
  }
}
