import { TestBed } from '@angular/core/testing';
import { MovieFacadeService } from './movie-facade.service';
import { MovieStateService } from '../state/movie-state.service';
import { MovieService } from '../movie.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { of, throwError } from 'rxjs';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { WATCH_LIST_KEY } from '../../../shared/constant/local-storage-key.const';

describe('MovieFacadeService', () => {
  let service: MovieFacadeService;
  let movieStateService: jasmine.SpyObj<MovieStateService>;
  let movieService: jasmine.SpyObj<MovieService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  const mockMovies: Movie[] = [
    {
      id: 1, title: 'Movie 1',
      releaseYear: 2021,
      genre: 'Action',
      posterPath: 'path1',
      isWatchList: false,
      backdrop_path: 'backdrop1',
      poster_path: 'poster1',
      release_date: '2021-01-01',
      overview: 'Overview 1',
      vote_average: '7.5',
      credits: {
        cast: [
          { profile_path: 'cast1', name: 'Actor 1' }
        ]
      }
    },
    {
      id: 2, title: 'Movie 2', isWatchList: false,
      releaseYear: 2021,
      genre: 'Action',
      posterPath: 'path1',
      backdrop_path: 'backdrop1',
      poster_path: 'poster1',
      release_date: '2021-01-01',
      overview: 'Overview 1',
      vote_average: '7.5',
      credits: {
        cast: [
          { profile_path: 'cast1', name: 'Actor 1' }
        ]
      }
    },
  ];
  const mockMovie: Movie = {
    id: 1, title: 'Movie 1', releaseYear: 2021,
    genre: 'Action',
    posterPath: 'path1',
    backdrop_path: 'backdrop1',
    poster_path: 'poster1',
    release_date: '2021-01-01',
    overview: 'Overview 1',
    vote_average: '7.5',
    credits: {
      cast: [
        { profile_path: 'cast1', name: 'Actor 1' }
      ]
    }, isWatchList: false
  };
  const mockWatchlist: Movie[] = [{
    id: 1, title: 'Movie 1', releaseYear: 2021,
    genre: 'Action',
    posterPath: 'path1',
    backdrop_path: 'backdrop1',
    poster_path: 'poster1',
    release_date: '2021-01-01',
    overview: 'Overview 1',
    vote_average: '7.5',
    credits: {
      cast: [
        { profile_path: 'cast1', name: 'Actor 1' }
      ]
    }, isWatchList: true
  }];

  beforeEach(() => {
    const movieStateServiceSpy = jasmine.createSpyObj('MovieStateService', [
      'setMovies',
      'getMovies$',
      'setLoading',
      'getLoading$',
      'setSelectedMovie',
      'getSelectedMovie$',
    ]);
    const movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getMovies',
      'getMovieDetails',
    ]);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        MovieFacadeService,
        { provide: MovieStateService, useValue: movieStateServiceSpy },
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    });

    service = TestBed.inject(MovieFacadeService);
    movieStateService = TestBed.inject(
      MovieStateService,
    ) as jasmine.SpyObj<MovieStateService>;
    movieService = TestBed.inject(
      MovieService,
    ) as jasmine.SpyObj<MovieService>;
    localStorageService = TestBed.inject(
      LocalStorageService,
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovie$', () => {
    it('should return movies observable from MovieStateService', () => {
      movieStateService.getMovies$.and.returnValue(of(mockMovies));

      const result$ = service.getMovie$();

      result$.subscribe((movies) => {
        expect(movies).toEqual(mockMovies);
      });
      expect(movieStateService.getMovies$).toHaveBeenCalled();
    });
  });

  describe('callMovies', () => {
    it('should fetch movies and update state with watchlist status', () => {
      movieService.getMovies.and.returnValue(of({ results: mockMovies }));
      localStorageService.getItem.and.returnValue(mockWatchlist);

      service.callMovies();

      expect(movieStateService.setLoading).toHaveBeenCalledWith(true);
      expect(movieService.getMovies).toHaveBeenCalled();
      expect(localStorageService.getItem).toHaveBeenCalledWith(WATCH_LIST_KEY);
      expect(movieStateService.setMovies).toHaveBeenCalledWith([
        {
          id: 1, title: 'Movie 1', releaseYear: 2021,
          genre: 'Action',
          posterPath: 'path1',
          backdrop_path: 'backdrop1',
          poster_path: 'poster1',
          release_date: '2021-01-01',
          overview: 'Overview 1',
          vote_average: '7.5',
          credits: {
            cast: [
              { profile_path: 'cast1', name: 'Actor 1' }
            ]
          }, isWatchList: true
        },
        {
          id: 2, title: 'Movie 2', releaseYear: 2021,
          genre: 'Action',
          posterPath: 'path1',
          backdrop_path: 'backdrop1',
          poster_path: 'poster1',
          release_date: '2021-01-01',
          overview: 'Overview 1',
          vote_average: '7.5',
          credits: {
            cast: [
              { profile_path: 'cast1', name: 'Actor 1' }
            ]
          }, isWatchList: false
        },
      ]);
      expect(movieStateService.setLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('setWatchListMovie', () => {
    it('should set watchlist status for movies', () => {
      localStorageService.getItem.and.returnValue(mockWatchlist);

      const result = service['setWatchListMovie'](mockMovies);

      expect(result).toEqual([
        {
          id: 1, title: 'Movie 1', releaseYear: 2021,
          genre: 'Action',
          posterPath: 'path1',
          backdrop_path: 'backdrop1',
          poster_path: 'poster1',
          release_date: '2021-01-01',
          overview: 'Overview 1',
          vote_average: '7.5',
          credits: {
            cast: [
              { profile_path: 'cast1', name: 'Actor 1' }
            ]
          }, isWatchList: true
        },
        {
          id: 2, title: 'Movie 2', releaseYear: 2021,
          genre: 'Action',
          posterPath: 'path1',
          backdrop_path: 'backdrop1',
          poster_path: 'poster1',
          release_date: '2021-01-01',
          overview: 'Overview 1',
          vote_average: '7.5',
          credits: {
            cast: [
              { profile_path: 'cast1', name: 'Actor 1' }
            ]
          }, isWatchList: false
        },
      ]);
      expect(localStorageService.getItem).toHaveBeenCalledWith(WATCH_LIST_KEY);
    });
  });

  describe('getLoading$', () => {
    it('should return loading observable from MovieStateService', () => {
      movieStateService.getLoading$.and.returnValue(of(true));

      const result$ = service.getLoading$();

      result$.subscribe((loading) => {
        expect(loading).toBeTrue();
      });
      expect(movieStateService.getLoading$).toHaveBeenCalled();
    });
  });

  describe('callMovieDetail', () => {
    it('should fetch movie details and update state with watchlist status', () => {
      movieService.getMovieDetails.and.returnValue(of(mockMovie));
      localStorageService.getItem.and.returnValue(mockWatchlist);

      service.callMovieDetail(1);

      expect(movieStateService.setLoading).toHaveBeenCalledWith(true);
      expect(movieService.getMovieDetails).toHaveBeenCalledWith(1);
      expect(localStorageService.getItem).toHaveBeenCalledWith(WATCH_LIST_KEY);
      expect(movieStateService.setSelectedMovie).toHaveBeenCalledWith({
        id: 1,
        title: 'Movie 1',
        releaseYear: 2021,
        genre: 'Action',
        posterPath: 'path1',
        backdrop_path: 'backdrop1',
        poster_path: 'poster1',
        release_date: '2021-01-01',
        overview: 'Overview 1',
        vote_average: '7.5',
        credits: {
          cast: [
            { profile_path: 'cast1', name: 'Actor 1' }
          ]
        },
        isWatchList: true,
      });
      expect(movieStateService.setLoading).toHaveBeenCalledWith(false);
    });

    it('should handle error when fetching movie details', () => {
      const mockError = new Error('Failed to fetch movie details');
      movieService.getMovieDetails.and.returnValue(throwError(() => mockError));

      service.callMovieDetail(1);

      expect(movieStateService.setLoading).toHaveBeenCalledWith(true);
      expect(movieService.getMovieDetails).toHaveBeenCalledWith(1);
      expect(movieStateService.setLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('getError$', () => {
    it('should return error observable', () => {
      const mockError = new Error('Test error');
      service['errorSubject'].next(mockError);

      const result$ = service.getError$();

      result$.subscribe((error) => {
        expect(error).toEqual(mockError);
      });
    });
  });
});