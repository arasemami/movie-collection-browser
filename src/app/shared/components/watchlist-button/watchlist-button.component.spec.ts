import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistButtonComponent } from './watchlist-button.component';
import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../interfaces/movie.interface';

describe('WatchlistButtonComponent', () => {
  let component: WatchlistButtonComponent;
  let fixture: ComponentFixture<WatchlistButtonComponent>;
  let watchlistService: jasmine.SpyObj<WatchlistService>;

  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    isWatchList: false,
    poster_path: '/path/to/poster.jpg',
    release_date: '2023-12-01',
    releaseYear: 2025,
    genre: 'Drama',
    posterPath: 'poster.jpg',
    backdrop_path: 'backdrop.jpg',
    overview: 'Test Overview',
    vote_average: '8.0',
    credits: {
      cast: [{ profile_path: 'profile.jpg', name: 'Test Actor' }]
    }
  };

  beforeEach(async () => {
    const watchlistServiceSpy = jasmine.createSpyObj('WatchlistService', [
      'addToWatchlist',
      'removeFromWatchlist',
    ]);

    await TestBed.configureTestingModule({
      imports: [WatchlistButtonComponent],
      providers: [
        { provide: WatchlistService, useValue: watchlistServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistButtonComponent);
    component = fixture.componentInstance;
    watchlistService = TestBed.inject(
      WatchlistService,
    ) as jasmine.SpyObj<WatchlistService>;

    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToWatchlist on WatchlistService when movie is not in watchlist', () => {
    component.movie.isWatchList = false;

    component.addToWatchlist();

    expect(watchlistService.addToWatchlist).toHaveBeenCalledWith(mockMovie);
    expect(watchlistService.removeFromWatchlist).not.toHaveBeenCalled();
    expect(component.movie.isWatchList).toBeTrue();
  });

  it('should call removeFromWatchlist on WatchlistService when movie is in watchlist', () => {
    component.movie.isWatchList = true;

    component.addToWatchlist();

    expect(watchlistService.removeFromWatchlist).toHaveBeenCalledWith(mockMovie.id);
    expect(watchlistService.addToWatchlist).not.toHaveBeenCalled();
    expect(component.movie.isWatchList).toBeFalse();
  });

  it('should update the button text based on movie.isWatchList', () => {
    const button = fixture.nativeElement.querySelector('button');

    component.movie.isWatchList = false;
    fixture.detectChanges();
    expect(button.textContent.trim()).toBe('Add to Watchlist');

    component.movie.isWatchList = true;
    fixture.detectChanges();
    expect(button.textContent.trim()).toBe('Remove to Watchlist');
  });
});