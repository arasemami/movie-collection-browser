import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieFacadeService } from '../../services/facade/movie-facade.service';
import { MovieStateService } from '../../services/state/movie-state.service';
import { of, Subject } from 'rxjs';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from '../../services/movie.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

fdescribe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieFacadeService: jasmine.SpyObj<MovieFacadeService>;
  let movieStateService: jasmine.SpyObj<MovieStateService>;
  let movieService: jasmine.SpyObj<MovieService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

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
    }
  ];

  beforeEach(async () => {
    const movieFacadeSpy = jasmine.createSpyObj('MovieFacadeService', ['callMovies', 'getMovie$', 'getLoading$']);
    const movieStateSpy = jasmine.createSpyObj('MovieStateService', [], {
      movies$: of(mockMovies),
      loading$: of(false),
    });
    const movieSpy = jasmine.createSpyObj('movieService', ['getMovies']);
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['getItem']);

    await TestBed.configureTestingModule({
      imports: [MovieListComponent, MovieCardComponent, LoadingSpinnerComponent, CommonModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: MovieFacadeService, useValue: movieFacadeSpy },
        { provide: MovieStateService, useValue: movieStateSpy },
        { provide: MovieService, useValue: movieSpy },
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    movieFacadeService = TestBed.inject(MovieFacadeService) as jasmine.SpyObj<MovieFacadeService>;
    movieStateService = TestBed.inject(MovieStateService) as jasmine.SpyObj<MovieStateService>;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;

    movieService.getMovies.and.returnValue(of({ results: mockMovies }));
    localStorageService.getItem.and.returnValue([]);

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set movies and filteredMovies on initialization', () => {
    movieFacadeService.getMovie$.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(component.movies).toEqual(mockMovies);
    expect(component.filteredMovies).toEqual(mockMovies);
  });

  it('should set isLoading based on the loading state', () => {
    movieFacadeService.getLoading$.and.returnValue(of(true));

    component.ngOnInit();

    expect(component.isLoading).toBeFalse();
  });

  it('should filter movies based on search query', () => {
    component.movies = mockMovies;
    component['filterMovies']('Movie 1');
    expect(component.filteredMovies).toEqual([mockMovies[0]]);

    component['filterMovies']('Movie 2');
    expect(component.filteredMovies).toEqual([mockMovies[1]]);

    component['filterMovies']('');
    expect(component.filteredMovies).toEqual(mockMovies);
  });

  it('should update filteredMovies when searchControl value changes', () => {
    component.movies = mockMovies;
    component.searchControl.setValue('Movie 2');
    expect(component.filteredMovies).toEqual([mockMovies[1]]);
  });

  it('should unsubscribe on component destruction', () => {
    const nextSpy = spyOn(component.componentDestroyed$, 'next');
    const completeSpy = spyOn(component.componentDestroyed$, 'complete');

    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should display loading spinner when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loadingSpinner = fixture.nativeElement.querySelector('app-loading-spinner');
    expect(loadingSpinner).toBeTruthy();
  });

  it('should display movies when isLoading is false', () => {
    component.isLoading = false;
    component.filteredMovies = mockMovies;
    fixture.detectChanges();
    const movieCards = fixture.nativeElement.querySelectorAll('app-movie-card');
    expect(movieCards.length).toBe(mockMovies.length);
  });
});