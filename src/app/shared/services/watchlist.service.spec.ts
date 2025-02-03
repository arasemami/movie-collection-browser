import { TestBed } from '@angular/core/testing';
import { WatchlistService } from './watchlist.service';
import { Movie } from '../../shared/interfaces/movie.interface';
import { BehaviorSubject } from 'rxjs';
import { WATCH_LIST_KEY } from '../constant/local-storage-key.const';

describe('WatchlistService', () => {
  let service: WatchlistService;
  let mockLocalStorage: { [key: string]: string } = {};

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => mockLocalStorage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockLocalStorage[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete mockLocalStorage[key];
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistService);
  });

  afterEach(() => {
    mockLocalStorage = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with movies from localStorage', () => {
    const movies: Movie[] = [{ id: 1, title: 'Movie 1', releaseYear: 2022, genre: 'Action', posterPath: '', isWatchList: true, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } }];
    mockLocalStorage[WATCH_LIST_KEY] = JSON.stringify(movies);

    service = new WatchlistService();
    service.getWatchlist$().subscribe((watchlist) => {
      expect(watchlist.length).toBe(1);
      expect(watchlist[0].id).toBe(1);
    });
  });

  it('should add a movie to the watchlist', () => {
    const movie: Movie = { id: 1, title: 'Movie 1', releaseYear: 2022, genre: 'Action', posterPath: '', isWatchList: false, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } };
    service.addToWatchlist(movie);

    service.getWatchlist$().subscribe((watchlist) => {
      expect(watchlist.length).toBe(1);
      expect(watchlist[0].id).toBe(1);
    });
  });

  it('should not add duplicate movies', () => {
    const movie: Movie = { id: 1, title: 'Movie 1', releaseYear: 2022, genre: 'Action', posterPath: '', isWatchList: false, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } };
    service.addToWatchlist(movie);
    service.addToWatchlist(movie);

    service.getWatchlist$().subscribe((watchlist) => {
      expect(watchlist.length).toBe(1);
    });
  });

  it('should remove a movie from the watchlist', () => {
    const movie: Movie = { id: 1, title: 'Movie 1', releaseYear: 2022, genre: 'Action', posterPath: '', isWatchList: false, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } };
    service.addToWatchlist(movie);
    service.removeFromWatchlist(1);

    service.getWatchlist$().subscribe((watchlist) => {
      expect(watchlist.length).toBe(0);
    });
  });

  it('should save watchlist to localStorage when modified', () => {
    const movie: Movie = { id: 1, title: 'Movie 1', releaseYear: 2022, genre: 'Action', posterPath: '', isWatchList: false, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } };
    service.addToWatchlist(movie);

    expect(localStorage.setItem).toHaveBeenCalledWith(WATCH_LIST_KEY, jasmine.any(String));
  });
});
