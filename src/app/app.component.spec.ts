import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppLoadingService, AppApiService } from './shared/services';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appLoadingService: jasmine.SpyObj<AppLoadingService>;
  let appApiService: jasmine.SpyObj<AppApiService>;

  beforeEach(() => {
    const appLoadingServiceSpy = jasmine.createSpyObj('AppLoadingService', ['destroyTimeoutAndInterval']);
    const appApiServiceSpy = jasmine.createSpyObj('AppApiService', ['destroyTimeoutAndInterval']);
    const isLoadingSubject = new Subject<boolean>();

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, MatToolbarModule],
      providers: [
        { provide: AppLoadingService, useValue: appLoadingServiceSpy },
        { provide: AppApiService, useValue: appApiServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appLoadingService = TestBed.inject(AppLoadingService) as jasmine.SpyObj<AppLoadingService>;
    appApiService = TestBed.inject(AppApiService) as jasmine.SpyObj<AppApiService>;

    appLoadingService.isLoading = isLoadingSubject;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call appApiService.destroyTimeoutAndInterval on ngOnDestroy', () => {
    component.ngOnDestroy();

    expect(appApiService.destroyTimeoutAndInterval).toHaveBeenCalled();
  });
});
