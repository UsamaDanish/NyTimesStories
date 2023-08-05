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
import { AppLoadingService, AppSnackbarService } from '../services';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: AppLoadingService, private snackbarService: AppSnackbarService, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.loadingService.show();

    // NOTE: Getting CORS error from API while passing token.

    // const authToken = this.authService.getToken();
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: "Bearer " + authToken
    //   }
    // });

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
