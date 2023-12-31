import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { StoriesComponent } from './stories/stories.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { StoriesRoutingModule } from './stories-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoryCardsComponent } from './story-cards/story-cards.component';
import { StoryCategoriesComponent } from './story-categories/story-categories.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';

@NgModule({
  declarations: [
    StoriesComponent,
    StoryDetailsComponent,
    StoryCardsComponent,
    StoryCategoriesComponent,
    SearchArticlesComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    MatTabsModule,
    MatRadioModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatPaginatorModule,
  ]
})
export class StoriesModule { }
