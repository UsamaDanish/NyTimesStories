import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { AppApiService, AppLoadingService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ny-times-stories';
  isLoading: Subject<boolean> = this.appLoadingService.isLoading;

  constructor(private appLoadingService: AppLoadingService, private apiService: AppApiService) { }

  ngOnDestroy() {
    this.apiService.destroyTimeoutAndInterval()
  }
}
