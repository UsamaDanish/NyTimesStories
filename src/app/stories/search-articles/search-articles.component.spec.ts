import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArticlesComponent } from './search-articles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchArticlesComponent', () => {
  let component: SearchArticlesComponent;
  let fixture: ComponentFixture<SearchArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchArticlesComponent, MatAutocomplete],
      imports: [HttpClientTestingModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, BrowserAnimationsModule],
      providers: [provideMockStore({})]
    });
    fixture = TestBed.createComponent(SearchArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
