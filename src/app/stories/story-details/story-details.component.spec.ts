import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { StoryDetailsComponent } from './story-details.component';
import { AppSnackbarService } from 'src/app/shared/services';
import { of, throwError } from 'rxjs';
import { Stories } from '../models';
import { setStories } from 'src/app/shared/store/actions';
import { MatIconModule } from '@angular/material/icon';

describe('StoryDetailsComponent', () => {
  let component: StoryDetailsComponent;
  let fixture: ComponentFixture<StoryDetailsComponent>;
  let activatedRoute: ActivatedRoute;
  let store: jasmine.SpyObj<Store>;
  let location: jasmine.SpyObj<Location>;
  let appSnackbar: jasmine.SpyObj<AppSnackbarService>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const activatedRouteStub = {
      params: of({ id: '123' }),
    };
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const appSnackbarSpy = jasmine.createSpyObj('AppSnackbarService', ['open']);

    TestBed.configureTestingModule({
      declarations: [StoryDetailsComponent],
      imports: [MatIconModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Store, useValue: storeSpy },
        { provide: Location, useValue: locationSpy },
        { provide: AppSnackbarService, useValue: appSnackbarSpy },
      ],
    });

    fixture = TestBed.createComponent(StoryDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    appSnackbar = TestBed.inject(AppSnackbarService) as jasmine.SpyObj<AppSnackbarService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back and clear stories on goBack', () => {
    component.goBack();

    expect(store.dispatch).toHaveBeenCalledWith(setStories({ stories: [] }));
    expect(location.back).toHaveBeenCalled();
  });

  it('should unsubscribe from subscription on ngOnDestroy', () => {
    const unsubscribeSpy = jasmine.createSpy();
    component.subscription = { unsubscribe: unsubscribeSpy } as any;

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
