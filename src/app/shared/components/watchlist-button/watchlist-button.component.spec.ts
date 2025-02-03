import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistButtonComponent } from './watchlist-button.component';
import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../interfaces/movie.interface';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { WATCH_LIST_KEY } from '../../constant/local-storage-key.const';
 
describe('WatchlistButtonComponent', () => {
  let component: WatchlistButtonComponent;
  let fixture: ComponentFixture<WatchlistButtonComponent>;
  let mockWatchlistService: jasmine.SpyObj<WatchlistService>;

  const localStorageMock = {
    getItem: jasmine.createSpy('getItem').and.returnValue(null),
    setItem: jasmine.createSpy('setItem')
  };

  beforeEach(async () => {
    mockWatchlistService = jasmine.createSpyObj('WatchlistService', ['addToWatchlist', 'removeFromWatchlist', 'getWatchlist$']);
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    await TestBed.configureTestingModule({
      imports: [WatchlistButtonComponent],
      providers: [
        { provide: WatchlistService, useValue: mockWatchlistService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WatchlistButtonComponent);
    component = fixture.componentInstance;

    component.movie = {
      id: 1,
      title: 'Test Movie',
      releaseYear: 2025,
      genre: 'Drama',
      posterPath: 'poster.jpg',
      isWatchList: false,
      backdrop_path: 'backdrop.jpg',
      poster_path: 'poster.jpg',
      release_date: '2025-01-01',
      overview: 'Test Overview',
      vote_average: '8.0',
      credits: {
        cast: [{ profile_path: 'profile.jpg', name: 'Test Actor' }]
      }
    };

    fixture.detectChanges();
  });

  describe('addToWatchlist', () => {
    let mockMovie: Movie;

    beforeEach(() => {
      mockMovie = component.movie;
    });

    it('should call addToWatchlist when movie is not in watchlist and update localStorage', () => {
      mockWatchlistService.addToWatchlist.and.callThrough();  

      component.addToWatchlist();

      expect(mockWatchlistService.addToWatchlist).toHaveBeenCalledOnceWith(mockMovie);

      
      expect(localStorage.setItem).toHaveBeenCalledOnceWith(WATCH_LIST_KEY, jasmine.any(String)); 
      expect(component.movie.isWatchList).toBeTrue();
    });

    it('should call removeFromWatchlist when movie is in watchlist and update localStorage', () => {
      mockMovie.isWatchList = true;
      fixture.detectChanges();

      mockWatchlistService.removeFromWatchlist.and.callThrough();  

      component.addToWatchlist();

      expect(mockWatchlistService.removeFromWatchlist).toHaveBeenCalledOnceWith(mockMovie.id);
      expect(localStorage.setItem).toHaveBeenCalledOnceWith(WATCH_LIST_KEY, jasmine.any(String));  
      expect(component.movie.isWatchList).toBeFalse();
    });

    it('should toggle isWatchList value correctly', () => {
      expect(component.movie.isWatchList).toBeFalse();
      component.addToWatchlist();
      expect(component.movie.isWatchList).toBeTrue();

      component.addToWatchlist();
      expect(component.movie.isWatchList).toBeFalse();
    });
  });

  describe('HTML button', () => {
    it('should display "Add to Watchlist" when movie is not in watchlist', () => {
      component.movie.isWatchList = false;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent.trim()).toBe('Add to Watchlist');
    });

    it('should display "Remove from Watchlist" when movie is in watchlist', () => {
      component.movie.isWatchList = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent.trim()).toBe('Remove to Watchlist');
    });
  });
});
