import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';

import { Stories } from '../models';
import { setStories } from 'src/app/shared/store/actions';
import { AppSnackbarService } from 'src/app/shared/services';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent {
  id: string = "";
  story: Stories | null = null;
  subscription;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<any>, private location: Location, private appSnackbar: AppSnackbarService) {
    this.subscription = this.activatedRoute.params.subscribe((x) => {
      this.id = x['id'];

      if (this.id) {
        this.getStoryFromStore(this.id);
      }
    })
  }


  getStoryFromStore = (id: string) => {
    this.store.select('stories').subscribe({
      next: (data) => {
        this.story = data.stories.find((x: Stories) => x.uri.includes(id));
      },
      error: (err) => this.appSnackbar.open(err.toString())
    })
  }

  goBack() {
    this.store.dispatch(setStories({ stories: [] }))
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
