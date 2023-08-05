import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppLoadingService {

  isLoading = new Subject<boolean>();

  constructor() {
  }

  /**
   * Service function to show the loader
   */
  show() {
    this.isLoading.next(true);
  }

  /**
   * Service function to hide the loader
   */
  hide() {
    this.isLoading.next(false);
  }
}
