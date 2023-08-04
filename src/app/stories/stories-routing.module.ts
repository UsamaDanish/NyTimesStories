import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './stories/stories.component';
import { StoryDetailsComponent } from './story-details/story-details.component';

const routes: Routes = [
  {
    path: '',
    component: StoriesComponent
  },
  {
    path: 'story-details/:id',
    component: StoryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule { }