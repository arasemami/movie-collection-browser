import { TestBed } from '@angular/core/testing';

import { MovieListFacadeService } from './movie-list-facade.service';

describe('MovieListFacadeService', () => {
  let service: MovieListFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieListFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
