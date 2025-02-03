import { TestBed } from '@angular/core/testing';
import { MovieStateService } from './movie-state.service';
import { Movie } from '../../../shared/interfaces/movie.interface';

describe('MovieStateService', () => {
  let service: MovieStateService;
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Movie 1',
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
      id: 2,
      title: 'Movie 2',
      releaseYear: 2022,
      genre: 'Drama',
      posterPath: 'path2',
      isWatchList: true,
      backdrop_path: 'backdrop2',
      poster_path: 'poster2',
      release_date: '2022-01-01',
      overview: 'Overview 2',
      vote_average: '8.0',
      credits: {
        cast: [
          { profile_path: 'cast2', name: 'Actor 2' }
        ]
      }
    },
  ];
  const mockMovie: Movie = {
    id: 1,
    title: 'Movie 1',
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieStateService],
    });
    service = TestBed.inject(MovieStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('movies$', () => {
    it('should set and get movies', (done) => {
      service.setMovies(mockMovies);

      service.getMovies$().subscribe((movies) => {
        expect(movies).toEqual(mockMovies);
        done();
      });
    });
  });

  describe('loading$', () => {
    it('should set and get loading state', (done) => {
      service.setLoading(true);

      service.getLoading$().subscribe((loading) => {
        expect(loading).toBeTrue();
        done();
      });
    });

    it('should set and get loading state as false', (done) => {
      service.setLoading(false);

      service.getLoading$().subscribe((loading) => {
        expect(loading).toBeFalse();
        done();
      });
    });
  });

  describe('selectedMovie$', () => {
    it('should set and get selected movie', (done) => {
      service.setSelectedMovie(mockMovie);

      service.getSelectedMovie$().subscribe((movie) => {
        expect(movie).toEqual(mockMovie);
        done();
      });
    });
  });
});