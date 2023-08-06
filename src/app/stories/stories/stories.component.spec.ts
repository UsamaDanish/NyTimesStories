import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesComponent } from './stories.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { StoryCardsComponent } from '../story-cards/story-cards.component';
import { StoryCategoriesComponent } from '../story-categories/story-categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchArticlesComponent } from '../search-articles/search-articles.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [StoriesComponent, StoryCardsComponent, StoryCategoriesComponent, SearchArticlesComponent, ],
      imports: [MatTabsModule, HttpClientTestingModule, MatSnackBarModule, MatRadioModule,MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
