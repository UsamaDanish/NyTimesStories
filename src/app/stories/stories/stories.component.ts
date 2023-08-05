import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { NewsApiService } from 'src/app/shared/services';
import { SearchArticlesResponse, Stories, StoriesResponse } from '../models';
import { setStories } from 'src/app/shared/store/actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  selectedNewsCategory: string = "";
  searchHistory: string[] = [];
  selectedTab = 0;
  page = 0;
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  stories: Stories[] = [];
  searchForm = new FormGroup({
    searchText: new FormControl('')
  });

  constructor(private newsService: NewsApiService, private store: Store<{ stories: any }>, private router: Router) {
    store.select('stories').subscribe({
      next: (data) => {
        this.stories = data.stories;
      },
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

  onSearch(selectedOption = "") {
    const searchText = selectedOption ? selectedOption : this.searchForm.value.searchText;
    
    this.newsService.searchArticles(searchText!, this.page).subscribe({
      next: (data: SearchArticlesResponse) => {
        if (data && data.response && data.response.docs) {
          this.saveSearchHistory(searchText!)

          this.length = data.response.meta.hits;

          const formattedArray: Stories[] = data.response.docs.map(x => {
            return {
              abstract: x.abstract,
              title: x.headline.main,
              item_type: x.document_type,
              published_date: x.pub_date,
              uri: x.uri,
              byline: x.byline.original ?? "unknown"
            }
          })

          this.store.dispatch(setStories({ stories: formattedArray }))
        }
      },
      error: (err) => console.log(err, 'error')
    })
  }

  switchTab() {
    this.store.dispatch(setStories({ stories: [] }))
  }

  saveSearchHistory(searchText: string) {
    if (searchText) {
      const index = this.searchHistory.indexOf(searchText);

      if (index > -1) {
        this.searchHistory.splice(index, 1);
      }

      this.searchHistory.unshift(searchText);

      if (this.searchHistory.length > 5) {
        this.searchHistory.pop();
      }
    }
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex;

    this.onSearch("");
  }

}
