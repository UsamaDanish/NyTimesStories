import { Component } from '@angular/core';
import { AppApiService, AppLoadingService } from './shared/services';
import { Subject } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ny-times-stories';
  isLoading: Subject<boolean> = this.appLoadingService.isLoading;

  constructor(private appLoadingService: AppLoadingService, private authService: AuthService, private apiService: AppApiService) {}

  ngOnDestroy() {
    this.apiService.destroyTimeoutAndInterval()
  }
}
