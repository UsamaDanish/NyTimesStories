import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryDetailsComponent } from './story-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

describe('StoryDetailsComponent', () => {
  let component: StoryDetailsComponent;
  let fixture: ComponentFixture<StoryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoryDetailsComponent],
      imports: [RouterTestingModule, MatSnackBarModule, MatIconModule],
      providers: [provideMockStore({})]
    });
    fixture = TestBed.createComponent(StoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
