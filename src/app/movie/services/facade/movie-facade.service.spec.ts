import { TestBed } from '@angular/core/testing';
 import { Movie } from '../../../shared/interfaces/movie.interface';
import { MovieStateService } from '../state/movie-state.service';

describe('MovieStateService', () => {
    let service: MovieStateService;

    
    const mockMovies: Movie[] = [
        {
            id: 1,
            title: 'Action Movie 1',
            releaseYear: 2022,
            genre: 'Action',
            posterPath: 'path/to/poster',
            isWatchList: true,
            backdrop_path: 'path/to/backdrop',
            poster_path: 'path/to/poster',
            release_date: '2022-01-01',
            overview: 'Action movie overview',
            vote_average: '7.5',
            credits: { cast: [{ profile_path: 'path/to/profile', name: 'Actor 1' }] }
        },
        {
            id: 2,
            title: 'Comedy Movie 2',
            releaseYear: 2023,
            genre: 'Comedy',
            posterPath: 'path/to/poster',
            isWatchList: false,
            backdrop_path: 'path/to/backdrop',
            poster_path: 'path/to/poster',
            release_date: '2023-01-01',
            overview: 'Comedy movie overview',
            vote_average: '6.5',
            credits: { cast: [{ profile_path: 'path/to/profile', name: 'Actor 2' }] }
        }
    ];

    const mockSelectedMovie: Movie = {
        id: 1,
        title: 'Action Movie 1',
        releaseYear: 2022,
        genre: 'Action',
        posterPath: 'path/to/poster',
        isWatchList: true,
        backdrop_path: 'path/to/backdrop',
        poster_path: 'path/to/poster',
        release_date: '2022-01-01',
        overview: 'Action movie overview',
        vote_average: '7.5',
        credits: { cast: [{ profile_path: 'path/to/profile', name: 'Actor 1' }] }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MovieStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set and get movies', (done) => {
        service.setMovies(mockMovies);

        service.getMovies$().subscribe((movies: Movie[]) => {
            expect(movies).toEqual(mockMovies);
            done();  
        });
    });

    it('should set and get loading state', (done) => {
        service.setLoading(true);

        service.getLoading$().subscribe((loading: boolean) => {
            expect(loading).toBeTrue();
            done();
        });
    });

    it('should set and get selected movie', (done) => {
        service.setSelectedMovie(mockSelectedMovie);

        service.getSelectedMovie$().subscribe((movie: Movie) => {
            expect(movie).toEqual(mockSelectedMovie);
            done();
        });
    });
});
