import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';

import { NewsApiService } from 'src/app/shared/services';
import { SearchArticlesResponse, Stories } from '../models';
import { setStories } from 'src/app/shared/store/actions';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent {
  searchHistory: string[] = [];
  searchText = "";
  page = 0;
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  searchForm = new FormGroup({
    searchText: new FormControl('')
  });
  searched = false;

  constructor(private newsService: NewsApiService, private store: Store<{ stories: any }>) {
   
  }

  onSearch(selectedOption = "") {
    this.searchText = selectedOption ? selectedOption as string : this.searchForm.value.searchText as string;
    
    this.searched = true;
    
    this.newsService.searchArticles(this.searchText, this.page).subscribe({
      next: (data: SearchArticlesResponse) => {
        if (data && data.response && data.response.docs) {
          this.saveSearchHistory(this.searchText)

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
      }
    })
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

    this.onSearch(this.searchText);
  }
}
