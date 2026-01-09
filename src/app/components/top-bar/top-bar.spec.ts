import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBar } from './top-bar';
import { AuthService } from '../../services/authService';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../../types/user';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('TopBar', () => {
  let component: TopBar;
  let fixture: ComponentFixture<TopBar>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let currentUserSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    currentUserSubject = new BehaviorSubject<any>(null);

    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      currentUser: currentUserSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [TopBar],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBar);
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

  it('should set user to null when currentUser is null', () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.USER,
    };
    currentUserSubject.next({ user: mockUser, token: 'abc', refreshToken: 'xyz' });
    expect(component.user).toEqual(mockUser);

    currentUserSubject.next(null);
    expect(component.user).toBeNull();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['userSubscription']!, 'unsubscribe');
    component.ngOnDestroy();
    expect(component['userSubscription']!.unsubscribe).toHaveBeenCalled();
  });
});
