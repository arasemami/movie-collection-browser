import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistComponent } from './watchlist.component';
import { WatchlistService } from '../../shared/services/watchlist.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { of, Subject } from 'rxjs';
import { Movie } from '../../shared/interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let watchlistServiceMock: jasmine.SpyObj<WatchlistService>;

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

  beforeEach(async () => {
    watchlistServiceMock = jasmine.createSpyObj('WatchlistService', ['getWatchlist$', 'removeFromWatchlist']);
    watchlistServiceMock.getWatchlist$.and.returnValue(of(mockMovies));

    await TestBed.configureTestingModule({
      imports: [WatchlistComponent, MovieCardComponent, LoadingSpinnerComponent],
      providers: [
        { provide: WatchlistService, useValue: watchlistServiceMock },
        { provide: ActivatedRoute, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize watchlistMovies and isLoading on ngOnInit', () => {
    expect(component.watchlistMovies).toEqual(mockMovies);
    expect(component.isLoading).toBe(false);
  });

  it('should call removeFromWatchlist method of WatchlistService when removeFromWatchlist is called', () => {
    const movieId = 1;
    component.removeFromWatchlist(movieId);
    expect(watchlistServiceMock.removeFromWatchlist).toHaveBeenCalledWith(movieId);
  });

  it('should complete componentDestroyed$ on ngOnDestroy', () => {
    const nextSpy = spyOn(component.componentDestroyed$, 'next');
    const completeSpy = spyOn(component.componentDestroyed$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});