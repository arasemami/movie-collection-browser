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

 

fdescribe('MovieListComponent', () => {
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
    movieFacadeServiceMock.callMovies.and.stub();

    await TestBed.configureTestingModule({
      imports: [
        MovieListComponent, // Import standalone component
        ReactiveFormsModule,
        MovieCardComponent, // Import standalone dependencies
        LoadingSpinnerComponent,
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

  fit('should call callMovies on ngOnInit', async () => {
    component.ngOnInit();  // Trigger ngOnInit
    fixture.detectChanges(); // Trigger change detection
  
    await fixture.whenStable(); // Wait for asynchronous operations to finish
  
    console.log(movieFacadeServiceMock);  // Log to inspect the mock
    
    expect(movieFacadeServiceMock.callMovies).toHaveBeenCalled(); // Check if callMovies was called
  });
  
 

  it('should subscribe to getLoading$ and update isLoading', () => {
    // Update the return value of the already spied method
    movieFacadeServiceMock.getLoading$.and.returnValue(of(false));
  
    component.ngOnInit();  // Trigger ngOnInit
    fixture.detectChanges();  // Trigger change detection
  
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