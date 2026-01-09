import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Location, useValue: mockLocation },
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty values', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.errorMessage).toBe('');
    expect(component.isLoading).toBe(false);
  });

  it('should show error when fields are empty', async () => {
    component.email = '';
    component.password = '';

    await component.onSubmit();

    expect(component.errorMessage).toBe('Please fill in all fields');
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should show error when email is empty', async () => {
    component.email = '';
    component.password = 'password123';

    await component.onSubmit();

    expect(component.errorMessage).toBe('Please fill in all fields');
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should show error when password is empty', async () => {
    component.email = 'test@example.com';
    component.password = '';

    await component.onSubmit();

    expect(component.errorMessage).toBe('Please fill in all fields');
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should call authService.login with correct credentials', async () => {
    const mockResponse = {
      status: 'success',
      data: {
        user: { id: '123', email: 'test@example.com' },
        token: 'abc',
        refreshToken: 'xyz',
      },
    };

    mockAuthService.login.and.returnValue(of(mockResponse));

    component.email = 'test@example.com';
    component.password = 'password123';

    await component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should handle login error', async () => {
    mockAuthService.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.email = 'test@example.com';
    component.password = 'wrongpassword';

    await component.onSubmit();

    expect(component.errorMessage).toBe('Login failed. Please try again.');
  });

  it('should clear error message on new submit', async () => {
    component.errorMessage = 'Previous error';
    component.email = '';
    component.password = '';

    await component.onSubmit();

    expect(component.errorMessage).not.toBe('Previous error');
  });
});
