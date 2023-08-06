import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { AppApiService } from 'src/app/shared/services';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let appApiService: jasmine.SpyObj<AppApiService>;

  beforeEach(() => {
    const appApiServiceSpy = jasmine.createSpyObj('AppApiService', ['signUp']);

    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule],
      providers: [{ provide: AppApiService, useValue: appApiServiceSpy }],
    });

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    appApiService = TestBed.inject(AppApiService) as jasmine.SpyObj<AppApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form initially', () => {
    expect(component.signUpForm.valid).toBeFalse();

    component.signUpForm.controls.email.setValue('test@example.com');
    component.signUpForm.controls.password.setValue('password');

    expect(component.signUpForm.valid).toBeTrue();
  });

  it('should call appApiService.signUp on form submission', () => {
    const email = 'test@example.com';
    const password = 'password';

    component.signUpForm.controls.email.setValue(email);
    component.signUpForm.controls.password.setValue(password);

    component.onSubmit();

    expect(appApiService.signUp).toHaveBeenCalledWith(email, password);
  });

  it('should not call appApiService.signUp on invalid form submission', () => {
    component.onSubmit();

    expect(appApiService.signUp).not.toHaveBeenCalled();
  });
});
