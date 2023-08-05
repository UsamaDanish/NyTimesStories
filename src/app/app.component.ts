import { Component } from '@angular/core';
import { AppLoadingService } from './shared/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ny-times-stories';
  isLoading: Subject<boolean> = this.appLoadingService.isLoading;

  constructor(private appLoadingService: AppLoadingService) {}


}
