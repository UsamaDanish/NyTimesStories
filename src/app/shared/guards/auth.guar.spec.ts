import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation for authenticated user', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    const routeSnapshot: ActivatedRouteSnapshot = {} as any;
    const stateSnapshot: RouterStateSnapshot = {} as any;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBe(true);
  });

  it('should navigate to "/" and return false for unauthenticated user', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate');

    const routeSnapshot: ActivatedRouteSnapshot = {} as any;
    const stateSnapshot: RouterStateSnapshot = {} as any;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
