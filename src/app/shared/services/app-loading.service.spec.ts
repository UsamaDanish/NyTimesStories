import { TestBed } from '@angular/core/testing';
import { AppLoadingService } from './app-loading.service';

describe('AppLoadingService', () => {
  let service: AppLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loading', () => {
    service.show();
    service.isLoading.subscribe(isLoading => {
      expect(isLoading).toBe(true);
    });
  });

  it('should hide loading', () => {
    service.hide();
    service.isLoading.subscribe(isLoading => {
      expect(isLoading).toBe(false);
    });
  });
});
