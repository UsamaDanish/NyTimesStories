import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpEventType, HTTP_INTERCEPTORS as angularHTTP_INTERCEPTORS } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ApiAuthInterceptor } from './api-request.interceptor';
import { AppLoadingService } from '../services/app-loading.service';
import { AppSnackbarService } from '../services/app-snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ApiAuthInterceptor', () => {
  let interceptor: ApiAuthInterceptor;
  let loadingService: AppLoadingService;
  let snackbarService: AppSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        ApiAuthInterceptor,
        AppLoadingService,
        AppSnackbarService,
        {
          provide: angularHTTP_INTERCEPTORS,
          useClass: ApiAuthInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(ApiAuthInterceptor);
    loadingService = TestBed.inject(AppLoadingService);
    snackbarService = TestBed.inject(AppSnackbarService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle HTTP error response', async(() => {
    const request = {} as any;
    const errorResponse = new HttpErrorResponse({ status: 401 });
    const next = {
      handle: () => throwError(errorResponse),
    } as any;

    spyOn(loadingService, 'show');
    spyOn(loadingService, 'hide');
    spyOn(snackbarService, 'open');

    interceptor.intercept(request, next).pipe(
      catchError((error: HttpErrorResponse) => {
        expect(loadingService.hide).toHaveBeenCalled();
        expect(snackbarService.open).toHaveBeenCalledWith('Email or password is incorrect.');
        return throwError(error);
      })
    ).subscribe({
      error: (error) => {
        expect(error).toBe(errorResponse);
      },
    });
  }));

  // Add more test cases for handling different status codes and scenarios.
});
