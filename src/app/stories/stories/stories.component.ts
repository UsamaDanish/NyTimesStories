import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { setStories } from 'src/app/shared/store/actions';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  selectedTab = 0;

  constructor(private store: Store<{ stories: any }>) {

  }

  switchTab() {
    this.store.dispatch(setStories({ stories: [] }))
  }

}
