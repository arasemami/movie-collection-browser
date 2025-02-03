import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieFacadeService } from '../../services/facade/movie-facade.service';
import { MovieStateService } from '../../services/state/movie-state.service';
import { of, Subject } from 'rxjs';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { WatchlistButtonComponent } from '../../../shared/components/watchlist-button/watchlist-button.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from '../../services/movie.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockMovieFacadeService: any;
  let mockMovieStateService: any;
  let mockMovieService: any;
  let mockLocalStorageService: any;

  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test Overview',
    releaseYear: 2021,
    genre: 'Action',
    posterPath: 'path1',
    isWatchList: false,
    backdrop_path: 'backdrop1',
    poster_path: 'poster1',
    release_date: '2021-01-01',
    vote_average: '7.5',
    credits: {
      cast: [
        { profile_path: 'cast1', name: 'Actor 1' }
      ]
    }
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockMovieFacadeService = {
      callMovieDetail: jasmine.createSpy('callMovieDetail').and.returnValue(of(mockMovie)),
      getSelectedMovie$: jasmine.createSpy('getSelectedMovie$').and.returnValue(of(mockMovie)),
      getLoading$: jasmine.createSpy('getLoading$').and.returnValue(of(false)),
      getError$: jasmine.createSpy('getError$').and.returnValue(of(null)),
    };

    mockMovieService = {
      getMovieDetails: jasmine.createSpy('getMovieDetails').and.returnValue(of(mockMovie)),
    };

    mockLocalStorageService = {
      getItem: jasmine.createSpy('getItem').and.returnValue([]),
    };

    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent, CommonModule, LoadingSpinnerComponent, WatchlistButtonComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MovieFacadeService, useValue: mockMovieFacadeService },
        { provide: MovieStateService, useValue: mockMovieStateService },
        { provide: MovieService, useValue: mockMovieService },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with movieId from route', () => {
    expect(component.movieId).toBe(1);
  });

  it('should handle invalid movieId and navigate to not-found', () => {
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(null);

    component.ngOnInit();

    expect(component.movieId).toBeNaN();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/not-found']);
  });

  it('should set movie and isLoading to false when movie is loaded', () => {
    component['setSubtractions']();

    expect(component.movie).toEqual(mockMovie);
    expect(component.isLoading).toBeFalse();
  });

  it('should complete componentDestroyed$ on ngOnDestroy', () => {
    spyOn(component.componentDestroyed$, 'next');
    spyOn(component.componentDestroyed$, 'complete');

    component.ngOnDestroy();

    expect(component.componentDestroyed$.next).toHaveBeenCalledWith(true);
    expect(component.componentDestroyed$.complete).toHaveBeenCalled();
  });
});