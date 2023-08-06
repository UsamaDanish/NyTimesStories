import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';
import { CONSTANTS } from '../constants';
import { JWTModel } from '../models';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize session and navigate to "stories"', () => {
    const token = 'dummy_token';

    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');

    service.initSession(token);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      CONSTANTS.LOCAL_STORAGE_KEY,
      token
    );
    expect(router.navigate).toHaveBeenCalledWith(['stories']);
  });

  it('should return false and navigate if token is expired', () => {
    const token = 'dummy_token';
    const decodedToken: JWTModel = {
      exp: Date.now() / 1000 - 3600, // Expired 1 hour ago
      email: "test@gmail.com",
      password: "test 123"
    };

    spyOn(localStorage, 'getItem').and.returnValue(token);
    spyOn(router, 'navigate');

    expect(service.isLoggedIn()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return false and navigate if token is missing', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');

    expect(service.isLoggedIn()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return false and navigate on error', () => {
    spyOn(localStorage, 'getItem').and.throwError('Storage Error');
    spyOn(router, 'navigate');

    expect(service.isLoggedIn()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should get token from localStorage', () => {
    const token = 'dummy_token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    expect(service.getToken()).toBe(token);
    expect(localStorage.getItem).toHaveBeenCalledWith(CONSTANTS.LOCAL_STORAGE_KEY);
  });
});
