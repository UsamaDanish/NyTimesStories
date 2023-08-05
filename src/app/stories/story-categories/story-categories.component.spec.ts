import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCategoriesComponent } from './story-categories.component';

describe('StoryCategoriesComponent', () => {
  let component: StoryCategoriesComponent;
  let fixture: ComponentFixture<StoryCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoryCategoriesComponent]
    });
    fixture = TestBed.createComponent(StoryCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
