import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatRadioModule } from '@angular/material/radio';

import { StoriesComponent } from './stories.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StoryCategoriesComponent } from '../story-categories/story-categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoryCardsComponent } from '../story-cards/story-cards.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchArticlesComponent } from '../search-articles/search-articles.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [StoriesComponent, StoryCategoriesComponent, StoryCardsComponent, SearchArticlesComponent, MatAutocomplete],
      imports: [MatTabsModule, HttpClientTestingModule, MatSnackBarModule, MatRadioModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatSelectModule, MatInputModule, MatFormFieldModule]
    });
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
