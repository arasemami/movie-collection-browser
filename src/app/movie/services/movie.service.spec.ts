import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should retrieve popular movies from the API', () => {
    const mockMovies = { results: [{ title: 'Movie 1' }, { title: 'Movie 2' }] };


    service.getMovies().subscribe((data) => {
      expect(data.results.length).toBe(2);
      expect(data.results[0].title).toBe('Movie 1');
      expect(data.results[1].title).toBe('Movie 2');
    });


    const req = httpMock.expectOne('https://api.themoviedb.org/3/movie/popular?api_key=49956d1242677d89f19f3bcaccbf84cb');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });


  it('should retrieve movie details from the API', () => {
    const movieId = 1;
    const mockMovieDetails = { title: 'Movie 1', credits: { cast: ['Actor 1', 'Actor 2'] } };


    service.getMovieDetails(movieId).subscribe((data) => {
      expect(data.title).toBe('Movie 1');
      expect(data.credits.cast.length).toBe(2);
      expect(data.credits.cast[0]).toBe('Actor 1');
      expect(data.credits.cast[1]).toBe('Actor 2');
    });


    const req = httpMock.expectOne(`https://api.themoviedb.org/3/movie/${movieId}?api_key=49956d1242677d89f19f3bcaccbf84cb&append_to_response=credits`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovieDetails);
  });


  afterEach(() => {
    httpMock.verify();
  });
});
