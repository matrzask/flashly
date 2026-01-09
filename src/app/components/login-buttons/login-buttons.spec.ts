import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginButtons } from './login-buttons';
import { AuthService } from '../../services/authService';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../../types/user';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';

describe('LoginButtons', () => {
  let component: LoginButtons;
  let fixture: ComponentFixture<LoginButtons>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let currentUserSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    currentUserSubject = new BehaviorSubject<any>(null);

    mockAuthService = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser: currentUserSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [LoginButtons],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with null user', () => {
    expect(component.user).toBeNull();
  });

  it('should update user when currentUser changes', () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.USER,
    };
    currentUserSubject.next({ user: mockUser, token: 'abc', refreshToken: 'xyz' });

    expect(component.user).toEqual(mockUser);
  });

  it('should set user to null when no user in currentUser', () => {
    currentUserSubject.next(null);
    expect(component.user).toBeNull();
  });

  it('should call authService.logout and navigate to login on logout()', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['userSubscription']!, 'unsubscribe');
    component.ngOnDestroy();
    expect(component['userSubscription']!.unsubscribe).toHaveBeenCalled();
  });
});
