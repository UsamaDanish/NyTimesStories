import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SearchArticlesComponent } from './search-articles.component';
import { NewsApiService } from 'src/app/shared/services';
import { setStories } from 'src/app/shared/store/actions';
import { Stories } from '../models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


describe('SearchArticlesComponent', () => {
  let component: SearchArticlesComponent;
  let fixture: ComponentFixture<SearchArticlesComponent>;
  let newsService: jasmine.SpyObj<NewsApiService>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const newsServiceSpy = jasmine.createSpyObj('NewsApiService', ['searchArticles']);
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      declarations: [SearchArticlesComponent],
      imports: [ReactiveFormsModule, MatPaginatorModule, MatFormFieldModule, MatAutocompleteModule],
      providers: [
        { provide: NewsApiService, useValue: newsServiceSpy },
        { provide: Store, useValue: storeSpy },
      ],
    });

    fixture = TestBed.createComponent(SearchArticlesComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsApiService) as jasmine.SpyObj<NewsApiService>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save search history', () => {
    component.saveSearchHistory('angular');
    component.saveSearchHistory('rxjs');
    component.saveSearchHistory('angular');
    component.saveSearchHistory('angular');
    component.saveSearchHistory('ngrx');

    expect(component.searchHistory).toEqual(['ngrx', 'angular', 'rxjs']);
  });
});
