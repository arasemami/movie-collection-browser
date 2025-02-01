import { TestBed } from '@angular/core/testing';

import { MovieListStateService } from './movie-list-state.service';

describe('MovieListStateService', () => {
  let service: MovieListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
