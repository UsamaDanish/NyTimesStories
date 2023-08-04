import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NewsApiService } from 'src/app/shared/services';
import { Stories, StoriesResponse } from '../models';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  selectedNewsCategory: string = "";
  stories: Stories[] = [];

  constructor(private newsService: NewsApiService) { }

  handleChange(event: MatRadioChange) {
    this.selectedNewsCategory = event.value;

    this.newsService.getStoriesByCategory(this.selectedNewsCategory).subscribe({
      next: (data: StoriesResponse) => {
        console.log(data, 'data');
        if (data && data.results && data.results.length) {

          this.stories = data.results;
        }
      },
      error: (err) => console.log(err, 'error')
    })
  }

}
