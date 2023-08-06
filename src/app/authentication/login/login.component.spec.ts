import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AppApiService } from 'src/app/shared/services';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let appApiService: jasmine.SpyObj<AppApiService>;

  beforeEach(() => {
    const appApiServiceSpy = jasmine.createSpyObj('AppApiService', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule],
      providers: [{ provide: AppApiService, useValue: appApiServiceSpy }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    appApiService = TestBed.inject(AppApiService) as jasmine.SpyObj<AppApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form initially', () => {
    expect(component.loginForm.valid).toBeFalse();

    component.loginForm.controls.email.setValue('test@example.com');
    component.loginForm.controls.password.setValue('password');

    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call appApiService.login on form submission', () => {
    const email = 'test@example.com';
    const password = 'password';

    component.loginForm.controls.email.setValue(email);
    component.loginForm.controls.password.setValue(password);

    appApiService.login.and.returnValue();

    component.onSubmit();

    expect(appApiService.login).toHaveBeenCalledWith(email, password);
  });

  it('should not call appApiService.login on invalid form submission', () => {
    component.onSubmit();

    expect(appApiService.login).not.toHaveBeenCalled();
  });
});
