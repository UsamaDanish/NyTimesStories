import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AppLoadingService, SnackbarService } from '../services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {

  //   newsBaseUrl = environment.newsBaseUrl;
  //   apiKey = environment.apiKey;

  // constructor(private loaderService: AppLoadingService,
  //     private snackBarService: SnackbarService) { }

  /**
   * HTTP interceptor to intercept the HTTP calls, add api-key to the
   * request, show/hide the loader and catch API error
   * @param request API request
   * @param next API request handler
   * @returns API response or the error object
   */
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //     this.loaderService.show();

  //     // if (request.url.includes(this.newsBaseUrl)) {
  //     //   const currentUser = this.authenticationService.currentUserValue;
  //     //   if (currentUser) {
  //     //     request = request.clone({
  //     //       url: `${request.url}api-key=${this.apiKey}`
  //     //     });
  //     //   } else {
  //     //     this.router.navigate(['/']);
  //     //   }
  //     // }

  //     return next.handle(request).pipe(
  //         finalize(() => this.loaderService.hide()),
  //     ).pipe(catchError(err => {
  //         const error = err.error.message || err.statusText;
  //         if (err.status === 401) {
  //             this.snackBarService.open(error);
  //             // auto logout if 401 response returned from api
  //             // this.authenticationService.logout();
  //         } else {
  //             this.snackBarService.open('Something went wrong. Please try again later.');
  //         }

  //         return throwError(() => error);
  //     }));
  // }

  private totalRequests = 0;

  constructor(private loadingService: AppLoadingService, private snackbarService: SnackbarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.loadingService.show();

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.snackbarService.open("Email or password is incorrect.");
        } else {
          this.snackbarService.open(error.statusText);
        }

        return throwError(error);
      })
    );
  }
}
