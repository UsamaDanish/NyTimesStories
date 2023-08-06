import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCardsComponent } from './story-cards.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('StoryCardsComponent', () => {
  let component: StoryCardsComponent;
  let fixture: ComponentFixture<StoryCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [StoryCardsComponent],
      imports: [MatSnackBarModule]
    });
    fixture = TestBed.createComponent(StoryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
