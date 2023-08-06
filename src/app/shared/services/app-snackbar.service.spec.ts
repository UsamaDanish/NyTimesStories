import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSnackbarService } from './app-snackbar.service';

describe('AppSnackbarService', () => {
  let service: AppSnackbarService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        AppSnackbarService,
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    });

    service = TestBed.inject(AppSnackbarService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar with correct message', () => {
    const message = 'Test message';
    service.open(message);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      message,
      '',
      jasmine.objectContaining({ duration: 3000 })
    );
  });
});
