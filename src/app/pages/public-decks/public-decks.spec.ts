import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicDecks } from './public-decks';
import { DeckService } from '../../services/deckService';
import { AuthService } from '../../services/authService';
import { of, BehaviorSubject, throwError } from 'rxjs';
import { Deck } from '../../types/deck';
import { SearchResponse } from '../../types/search-response';
import { UserRole } from '../../types/user';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('PublicDecks', () => {
  let component: PublicDecks;
  let fixture: ComponentFixture<PublicDecks>;
  let mockDeckService: jasmine.SpyObj<DeckService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let currentUserSubject: BehaviorSubject<any>;

  const mockDecks: Deck[] = [
    { id: '1', name: 'Public Deck 1', public: true, createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Public Deck 2', public: true, createdAt: new Date(), updatedAt: new Date() },
  ];

  const mockSearchResponse: SearchResponse<Deck> = {
    data: mockDecks,
    pagination: {
      page: 1,
      limit: 10,
      totalPages: 1,
      totalItems: 2,
      hasMore: false,
    },
  };

  beforeEach(async () => {
    currentUserSubject = new BehaviorSubject<any>(null);

    mockDeckService = jasmine.createSpyObj('DeckService', ['getPublicDecks', 'copyPublicDeck']);
    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      currentUser: currentUserSubject.asObservable(),
    });

    mockDeckService.getPublicDecks.and.returnValue(of(mockSearchResponse));

    await TestBed.configureTestingModule({
      imports: [PublicDecks],
      providers: [
        { provide: DeckService, useValue: mockDeckService },
        { provide: AuthService, useValue: mockAuthService },
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicDecks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(1);
    expect(component.limit).toBe(10);
    expect(component.searchName).toBe('');
    expect(component.searchAuthor).toBe('');
    expect(component.user).toBeNull();
  });

  it('should load public decks on initialization', () => {
    expect(component.decks).toEqual(mockDecks);
    expect(component.totalPages).toBe(1);
    expect(component.totalItems).toBe(2);
    expect(mockDeckService.getPublicDecks).toHaveBeenCalled();
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

  it('should copy deck when user is logged in', () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.USER,
    };
    currentUserSubject.next({ user: mockUser, token: 'abc', refreshToken: 'xyz' });

    const copiedDeck: Deck = { ...mockDecks[0], id: '3' };
    mockDeckService.copyPublicDeck.and.returnValue(of(copiedDeck));

    spyOn(window, 'alert');

    component.copyDeck(mockDecks[0]);

    expect(mockDeckService.copyPublicDeck).toHaveBeenCalledWith('1');
    expect(window.alert).toHaveBeenCalledWith('Deck "Public Deck 1" copied successfully!');
  });

  it('should show alert when trying to copy deck without login', () => {
    spyOn(window, 'alert');
    component.user = null;

    component.copyDeck(mockDecks[0]);

    expect(window.alert).toHaveBeenCalledWith('You must be logged in to copy a deck.');
    expect(mockDeckService.copyPublicDeck).not.toHaveBeenCalled();
  });

  it('should handle copy deck error', () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.USER,
    };
    currentUserSubject.next({ user: mockUser, token: 'abc', refreshToken: 'xyz' });

    mockDeckService.copyPublicDeck.and.returnValue(throwError(() => new Error('Failed')));
    spyOn(window, 'alert');

    component.copyDeck(mockDecks[0]);

    expect(window.alert).toHaveBeenCalledWith('Failed to copy deck.');
  });

  it('should set loading state correctly', () => {
    expect(component.loading).toBe(false);
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnDestroy();
    expect(component['userSubscription']).toBeDefined();
  });
});
