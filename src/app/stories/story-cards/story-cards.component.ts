import { Component } from '@angular/core';
import { Stories } from '../models';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-cards',
  templateUrl: './story-cards.component.html',
  styleUrls: ['./story-cards.component.css']
})
export class StoryCardsComponent {
  stories: Stories[] = [];

  constructor(private store: Store<{ stories: any }>, private router: Router) {
    store.select('stories').subscribe({
      next: (data) => {
        this.stories = data.stories;
      },
      error: (err) => console.log(err, 'err')
    });
  }

  navigateToStoryDetails(uri: string) {
    const splittedUri = uri.split('/');

    if (splittedUri.length > 3) {
      this.router.navigate(['/story-details', splittedUri[3]])
    }
  }

}
