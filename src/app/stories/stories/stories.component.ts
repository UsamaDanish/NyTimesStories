import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { NewsApiService } from 'src/app/shared/services';
import { Stories, StoriesResponse } from '../models';
import { setStories } from 'src/app/shared/store/actions';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  selectedNewsCategory: string = "";
  stories: Stories[] = [];

  constructor(private newsService: NewsApiService, private store: Store<{ stories: any }>, private router: Router) {
    store.select('stories').subscribe({
      next: (data) => { this.stories = data.stories; },
      error: (err) => console.log(err, 'err')
    });
  }

  handleChange(event: MatRadioChange) {
    this.selectedNewsCategory = event.value;

    this.newsService.getStoriesByCategory(this.selectedNewsCategory).subscribe({
      next: (data: StoriesResponse) => {
        if (data && data.results && data.results.length) {
          this.store.dispatch(setStories({ stories: data.results }))
        }
      },
      error: (err) => console.log(err, 'error')
    })
  }

  navigateToStoryDetails(uri: string) {
    const splittedUri = uri.split('/');

    if (splittedUri.length > 3) {
      this.router.navigate(['/story-details', splittedUri[3]])
    }
  }

}
