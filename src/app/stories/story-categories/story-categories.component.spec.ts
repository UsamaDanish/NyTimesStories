import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCategoriesComponent } from './story-categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatRadioModule } from '@angular/material/radio';

describe('StoryCategoriesComponent', () => {
  let component: StoryCategoriesComponent;
  let fixture: ComponentFixture<StoryCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [StoryCategoriesComponent],
      imports: [HttpClientTestingModule, MatRadioModule]
    });
    fixture = TestBed.createComponent(StoryCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
