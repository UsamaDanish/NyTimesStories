import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Stories } from '../models';
import { AppSnackbarService } from 'src/app/shared/services';

@Component({
  selector: 'app-story-cards',
  templateUrl: './story-cards.component.html',
  styleUrls: ['./story-cards.component.css']
})
export class StoryCardsComponent {
  stories: Stories[] = [];

  constructor(private store: Store<{ stories: any }>, private router: Router, private appSnackBar: AppSnackbarService) {
    store.select('stories').subscribe({
      next: (data) => {
        this.stories = data.stories;
      },
      error: (err) => this.appSnackBar.open(err.toString())
    });
  }

  navigateToStoryDetails(uri: string) {
    const splittedUri = uri.split('/');

    if (splittedUri.length > 3) {
      this.router.navigate(['/story-details', splittedUri[3]])
    }
  }

}
