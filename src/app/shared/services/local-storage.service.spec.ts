import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    service = TestBed.inject(LocalStorageService);

    localStorage.clear();

    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(localStorage, 'getItem').and.callThrough();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setItem', () => {
    it('should store the item in localStorage', () => {
      const key = 'testKey';
      const value = { name: 'testValue' };

      service.setItem(key, value);

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
    });
  });

  describe('getItem', () => {
    it('should return the item from localStorage if it exists', () => {
      const key = 'testKey';
      const value = { name: 'testValue' };
      localStorage.setItem(key, JSON.stringify(value));

      const result = service.getItem(key);

      expect(localStorage.getItem).toHaveBeenCalledWith(key);
      expect(result).toEqual(value);
    });

    it('should return undefined if the item does not exist in localStorage', () => {
      const key = 'nonExistentKey';

      const result = service.getItem(key);

      expect(localStorage.getItem).toHaveBeenCalledWith(key);
      expect(result).toBeUndefined();
    });
  });
});