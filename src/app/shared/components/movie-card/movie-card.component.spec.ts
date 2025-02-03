import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';
import { By } from '@angular/platform-browser';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MovieCardComponent,
        WatchlistButtonComponent,
        RouterTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = { title: 'Test Movie', poster_path: '/path/to/poster.jpg', release_date: '2023-12-01', id: 123 };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie title and release date', () => {
    component.movie = {
      id: 1,
      title: 'Test Movie',
      release_date: '2023-05-15',
      poster_path: '/test-poster.jpg',
      overview: 'This is a test movie description.'
    };
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    const releaseDate = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(title.textContent).toContain('Test Movie');
    expect(releaseDate.textContent).toContain('2023');
  });

  it('should have correct routerLink for movie details', () => {
    component.movie = { title: 'Test Movie', poster_path: '/path/to/poster.jpg', release_date: '2023-12-01', id: 1 };
    fixture.detectChanges();

    const linkElement: HTMLElement = fixture.debugElement.query(By.css('a')).nativeElement;
    const href = linkElement.getAttribute('href');

    expect(href).toBe('/movie/1');
  });

  it('should render watchlist button and pass movie data', () => {
    component.movie = { id: 1, title: 'Test Movie', poster_path: '', release_date: '', overview: '' };
    fixture.detectChanges();

    const watchlistButton = fixture.debugElement.query(By.directive(WatchlistButtonComponent));
    expect(watchlistButton).toBeTruthy();
    expect(watchlistButton.componentInstance.movie).toEqual(component.movie);
  });

  it('should not break if no movie is passed', () => {
    component.movie = undefined;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h3'));
    const releaseDate = fixture.debugElement.query(By.css('p'));

    expect(title).toBeFalsy();
    expect(releaseDate).toBeFalsy();
  });

  it('should render the movie poster image', () => {
    component.movie = {
      id: 1,
      title: 'Test Movie',
      release_date: '2023-05-15',
      poster_path: '/test-poster.jpg',
      overview: 'This is a test movie description.'
    };
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain('https://image.tmdb.org/t/p/w500/test-poster.jpg');
  });

  it('should have correct default styles', () => {
    const cardDiv = fixture.debugElement.query(By.css('div.relative')).nativeElement;
    expect(cardDiv.classList).toContain('bg-gray-900');
    expect(cardDiv.classList).toContain('group');
  });
});
