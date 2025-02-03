import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, skip, throwError } from 'rxjs';
import { MovieFacadeService } from './movie-facade.service';
import { MovieStateService } from '../state/movie-state.service';
import { MovieService } from '../movie.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { WATCH_LIST_KEY } from '../../../shared/constant/local-storage-key.const';
import { Movie } from '../../../shared/interfaces/movie.interface';

fdescribe('MovieFacadeService', () => {
  let service: MovieFacadeService;
  let movieStateService: jasmine.SpyObj<MovieStateService>;
  let movieService: jasmine.SpyObj<MovieService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const movieStateSpy = jasmine.createSpyObj('MovieStateService', ['getMovies$', 'setMovies', 'setLoading', 'getLoading$', 'getSelectedMovie$', 'setSelectedMovie']);
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies', 'getMovieDetails']);
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['getItem']);

    TestBed.configureTestingModule({
      providers: [
        MovieFacadeService,
        { provide: MovieStateService, useValue: movieStateSpy },
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    service = TestBed.inject(MovieFacadeService);
    movieStateService = TestBed.inject(MovieStateService) as jasmine.SpyObj<MovieStateService>;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies', (done) => {
    const movies: Movie[] = [{ id: 1, title: 'Test', releaseYear: 2020, genre: 'Action', posterPath: '', isWatchList: false, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } }];
    movieStateService.getMovies$.and.returnValue(of(movies));

    service.getMovie$().subscribe(result => {
      expect(result).toEqual(movies);
      done();
    });
  });

  it('should call movies and set them', () => {
    const movies = [{ id: 1, title: 'Test', releaseYear: 2020, genre: 'Action', posterPath: '', isWatchList: false, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } }];
    movieService.getMovies.and.returnValue(of({ results: movies }));
    localStorageService.getItem.and.returnValue([]);

    service.callMovies();

    expect(movieStateService.setLoading).toHaveBeenCalledWith(true);
    expect(movieStateService.setMovies).toHaveBeenCalledWith(movies);
    expect(movieStateService.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle error when calling movies', () => {
    const error = new Error('Failed to fetch movies');
    movieService.getMovies.and.returnValue(throwError(() => error));

    service.callMovies();

    expect(movieStateService.setLoading).toHaveBeenCalledWith(true);
    service.getError$().subscribe(err => {
      expect(err).toEqual(error);
    });
    expect(movieStateService.setLoading).toHaveBeenCalledWith(false);
  });

  it('should get selected movie', (done) => {
    const movie: Movie = { id: 1, title: 'Test', releaseYear: 2020, genre: 'Action', posterPath: '', isWatchList: false, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } };
    movieStateService.getSelectedMovie$.and.returnValue(of(movie));

    service.getSelectedMovie$().subscribe(result => {
      expect(result).toEqual(movie);
      done();
    });
  });

  it('should call movie details and set selected movie', () => {
    const movie: Movie = { id: 1, title: 'Test', releaseYear: 2020, genre: 'Action', posterPath: '', isWatchList: false, backdrop_path: '', poster_path: '', release_date: '', overview: '', vote_average: '', credits: { cast: [] } };
    movieService.getMovieDetails.and.returnValue(of(movie));
    localStorageService.getItem.and.returnValue([]);

    service.callMovieDetail(1);

    expect(movieStateService.setLoading).toHaveBeenCalledWith(true);
    expect(movieStateService.setSelectedMovie).toHaveBeenCalledWith(movie);
    expect(movieStateService.setLoading).toHaveBeenCalledWith(false);
  });

 
  it('should handle error when calling movie details', (done) => {
    const error = new Error('Failed to fetch movie details');
    movieService.getMovieDetails.and.returnValue(throwError(() => error));
  
    service.callMovieDetail(1); 
  
    service.getError$().pipe(skip(1)).subscribe(err => {
      expect(err).toEqual(error);
      done();
    });
  });
  

  it('should handle error when fetching movie details fails', fakeAsync((done : any) => {
    const errorMessage = 'Failed to fetch movie details';
  
    
    movieService.getMovieDetails.and.returnValue(throwError(() => new Error(errorMessage)));
  
    service.callMovieDetail(1); 
  
    let errorReceived = false;
    service.getError$().pipe(skip(1)).subscribe((error) => {
      expect(error).toEqual(new Error(errorMessage));
      errorReceived = true;
      done();
    });
  
    tick(); 
    expect(movieStateService.setLoading).toHaveBeenCalledWith(true);
    expect(movieStateService.setLoading).toHaveBeenCalledWith(false);
  
    
    expect(errorReceived).toBeTrue();
  }));
  
  

  it('should get loading state', (done) => {
    movieStateService.getLoading$.and.returnValue(of(true));
    service.getLoading$().subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  });
});
