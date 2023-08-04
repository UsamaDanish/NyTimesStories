import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { StoriesComponent } from './stories/stories.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { StoriesRoutingModule } from './stories-routing.module';

@NgModule({
  declarations: [
    StoriesComponent,
    StoryDetailsComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    MatTabsModule,
    MatRadioModule,
    FormsModule,
    NgFor,
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class StoriesModule { }
