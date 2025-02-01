import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieFacadeService } from '../../services/facade/movie-facade.service';
import { of } from 'rxjs';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

// Mock the WatchlistButtonComponent
@Component({
  selector: 'app-watchlist-button',
  template: '',
  standalone: true // Mark the mock component as standalone
})
class MockWatchlistButtonComponent {
  // Add any required inputs here
  @Input() movie: Movie | undefined;
}

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieFacadeServiceMock: jasmine.SpyObj<MovieFacadeService>;
  let movieService: jasmine.SpyObj<MovieService>;

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
    movieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    movieService.getMovies.and.returnValue(of(mockMovies));
    movieFacadeServiceMock = jasmine.createSpyObj<MovieFacadeService>('MovieFacadeService', [
      'callMovies',
      'getMovie$',
      'getLoading$'
    ]);

    movieFacadeServiceMock.getMovie$.and.returnValue(of(mockMovies));
    movieFacadeServiceMock.getLoading$.and.returnValue(of(false));

    await TestBed.configureTestingModule({
      imports: [
        MovieListComponent, // Import standalone component
        ReactiveFormsModule,
        MovieCardComponent, // Import standalone dependencies
        LoadingSpinnerComponent,
        MockWatchlistButtonComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MovieFacadeService, useValue: movieFacadeServiceMock },
        { provide: MovieService, useValue: movieService },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ search: 'some search query' }), // Mock queryParams
          },
        },
        HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete componentDestroyed$ on ngOnDestroy', () => {
    const completeSpy = spyOn(component.componentDestroyed$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call callMovies on ngOnInit', () => {
    spyOn(movieFacadeServiceMock, 'callMovies').and.callThrough(); // Spy on the service's callMovies method
    component.ngOnInit();  // Trigger ngOnInit
    fixture.detectChanges(); // Trigger change detection

    expect(movieFacadeServiceMock.callMovies).toHaveBeenCalled();
  });

  it('should subscribe to getMovie$ and update movies and filteredMovies', () => {
    component.ngOnInit(); // Trigger ngOnInit
    fixture.detectChanges(); // Trigger change detection

    expect(movieFacadeServiceMock.getMovie$).toHaveBeenCalled();

    // Add a second fixture.detectChanges() to ensure async data is properly handled
    fixture.detectChanges();

    expect(component.movies).toEqual(mockMovies);
    expect(component.filteredMovies).toEqual(mockMovies);
  });


  it('should subscribe to getLoading$ and update isLoading', () => {
    // Spy on getLoading$ to ensure it's called
    spyOn(movieFacadeServiceMock, 'getLoading$').and.returnValue(of(false));  // Mock it to return `false`

    component.ngOnInit();  // Trigger ngOnInit
    fixture.detectChanges();  // Trigger change detection

    // Check if getLoading$ was called
    expect(movieFacadeServiceMock.getLoading$).toHaveBeenCalled();

    // Check if isLoading is updated correctly
    expect(component.isLoading).toBeFalse();
  });




  it('should handle empty search query', () => {
    component.movies = mockMovies; // Manually set movies
    component.searchControl.setValue('');
    fixture.detectChanges(); // Trigger change detection

    expect(component.filteredMovies).toEqual(mockMovies);
  });

  it('should handle null search query', () => {
    component.movies = mockMovies; // Manually set movies
    component.searchControl.setValue(null as any); // Simulate null search query
    fixture.detectChanges(); // Trigger change detection

    expect(component.filteredMovies).toEqual(mockMovies);
  });
});