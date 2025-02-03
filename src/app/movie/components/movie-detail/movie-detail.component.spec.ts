import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { MovieFacadeService } from '../../services/facade/movie-facade.service';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { WatchlistButtonComponent } from '../../../shared/components/watchlist-button/watchlist-button.component';
import { CommonModule } from '@angular/common';
import { ParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieFacadeService: jasmine.SpyObj<MovieFacadeService>;
  let router: jasmine.SpyObj<Router>;

  const mockMovie: Movie = {
    id: 1,
    title: 'Inception',
    releaseYear: 2010,
    genre: 'Sci-Fi',
    posterPath: '/inception.jpg',
    isWatchList: false,
    backdrop_path: '/backdrop.jpg',
    poster_path: '/poster.jpg',
    release_date: '2010-07-16',
    overview: 'A mind-bending thriller.',
    vote_average: '8.8',
    credits: {
      cast: [{ profile_path: '/actor.jpg', name: 'Leonardo DiCaprio' }]
    }
  };

  const mockParamMap: ParamMap = {
    get: (key: string) => (key === 'id' ? '1' : null),
    getAll: (key: string) => (key === 'id' ? ['1'] : []),
    has: (key: string) => key === 'id',
    keys: ['id']
  };

const mockActivatedRouteSnapshot: Partial<ActivatedRouteSnapshot> = {
  paramMap: mockParamMap,
  url: [],
  params: { id: '1' },
  queryParams: {},
  fragment: null,
  data: {},
  component: null
};

const activatedRouteMock: Partial<ActivatedRoute> = {
  snapshot: mockActivatedRouteSnapshot as ActivatedRouteSnapshot,
  paramMap: of(mockParamMap)  
};

  beforeEach(async () => {
    const movieFacadeSpy = jasmine.createSpyObj('MovieFacadeService', [
      'callMovieDetail',
      'getSelectedMovie$',
      'getLoading$',
      'getError$'
    ]);

    movieFacadeSpy.getSelectedMovie$.and.returnValue(of(mockMovie));
    movieFacadeSpy.getLoading$.and.returnValue(of(false));
    movieFacadeSpy.getError$.and.returnValue(of(null));

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);



    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        LoadingSpinnerComponent,
        WatchlistButtonComponent,
        MovieDetailComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MovieFacadeService, useValue: movieFacadeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    movieFacadeService = TestBed.inject(MovieFacadeService) as jasmine.SpyObj<MovieFacadeService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize movieId and fetch movie details', () => {
    spyOn(component, 'navigateToNotFound');
  
    
    movieFacadeService.getSelectedMovie$.and.returnValue(of(mockMovie));
    movieFacadeService.getLoading$.and.returnValue(of(false));
    movieFacadeService.getError$.and.returnValue(of(null));
  
    
    fixture.detectChanges();
  
    
    expect(component.movieId).toBe(1);
    expect(movieFacadeService.callMovieDetail).toHaveBeenCalledWith(1);
  
    
    expect(component.movie?.id).toBe(mockMovie.id);
    expect(component.movie?.title).toBe(mockMovie.title);
    expect(component.movie?.release_date).toBe(mockMovie.release_date);
  });


  it('should navigate to not-found if movieId is invalid', () => {
    
    const invalidMockParamMap: ParamMap = {
      get: (key: string) => (key === 'id' ? null : null), 
      getAll: (key: string) => (key === 'id' ? [] : []),
      has: (key: string) => key === 'id',
      keys: ['id']
    };

    const invalidMockActivatedRouteSnapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: invalidMockParamMap,
      url: [],
      params: { id: null },
      queryParams: {},
      fragment: null,
      data: {},
      component: null
    };

    const invalidActivatedRouteMock: Partial<ActivatedRoute> = {
      snapshot: invalidMockActivatedRouteSnapshot as ActivatedRouteSnapshot,
      paramMap: of(invalidMockParamMap) 
    };

    
    TestBed.overrideProvider(ActivatedRoute, { useValue: invalidActivatedRouteMock });
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;

    
    fixture.detectChanges();

    
    expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
  });

  it('should update movie details when getSelectedMovie$ emits a new movie', () => {
    movieFacadeService.getSelectedMovie$.and.returnValue(of(mockMovie));
    fixture.detectChanges(); 
    expect(component.movie).toEqual(mockMovie);
  });


  it('should update loading state when getLoading$ emits', () => {
    movieFacadeService.getLoading$.and.returnValue(of(true));
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();
  });

  it('should navigate to not-found if getError$ emits an error', () => {
    movieFacadeService.getError$.and.returnValue(of('Error fetching movie'));
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
  });

  it('should complete componentDestroyed$ on ngOnDestroy', () => {
    const spy = spyOn(component.componentDestroyed$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});