import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Store } from '@ngrx/store';

import { NewsApiService } from 'src/app/shared/services';
import { StoriesResponse } from '../models';
import { setStories } from 'src/app/shared/store/actions';

@Component({
  selector: 'app-story-categories',
  templateUrl: './story-categories.component.html',
  styleUrls: ['./story-categories.component.css']
})
export class StoryCategoriesComponent {
  selectedNewsCategory: string = "";

  constructor(private newsService: NewsApiService, private store: Store<{ stories: any }>) {

  }

  handleChange(event: MatRadioChange) {
    this.selectedNewsCategory = event.value;

    this.newsService.getStoriesByCategory(this.selectedNewsCategory).subscribe({
      next: (data: StoriesResponse) => {
        if (data && data.results && data.results.length) {
          this.store.dispatch(setStories({ stories: data.results }))
        }
      }
    })
  }
}
