import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DeckList } from './deck-list';
import { DeckService } from '../../services/deckService';
import { of, throwError } from 'rxjs';
import { Deck } from '../../types/deck';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('DeckList', () => {
  let component: DeckList;
  let fixture: ComponentFixture<DeckList>;
  let mockDeckService: jasmine.SpyObj<DeckService>;

  const mockDecks: Deck[] = [
    { id: '1', name: 'Deck 1', public: false, createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Deck 2', public: true, createdAt: new Date(), updatedAt: new Date() },
  ];

  beforeEach(async () => {
    mockDeckService = jasmine.createSpyObj('DeckService', ['getDecks', 'createDeck', 'deleteDeck']);

    mockDeckService.getDecks.and.returnValue(of([...mockDecks]));

    await TestBed.configureTestingModule({
      imports: [DeckList],
      providers: [
        { provide: DeckService, useValue: mockDeckService },
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty decks and default values', () => {
    expect(component.showNewDeckForm).toBe(false);
    expect(component.newDeckName).toBe('');
    expect(component.addingDeck).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should load decks on initialization', () => {
    expect(component.decks).toEqual(mockDecks);
    expect(mockDeckService.getDecks).toHaveBeenCalled();
  });

  it('should toggle new deck form', () => {
    expect(component.showNewDeckForm).toBe(false);

    component.toggleNewDeckForm();
    expect(component.showNewDeckForm).toBe(true);
    expect(component.errorMessage).toBe('');
    expect(component.newDeckName).toBe('');

    component.toggleNewDeckForm();
    expect(component.showNewDeckForm).toBe(false);
  });

  it('should show error when adding deck with empty name', () => {
    component.newDeckName = '   ';
    component.addNewDeck();

    expect(component.errorMessage).toBe('Deck name cannot be empty');
    expect(mockDeckService.createDeck).not.toHaveBeenCalled();
  });

  it('should create new deck successfully', () => {
    const newDeck: Deck = {
      id: '3',
      name: 'New Deck',
      public: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockDeckService.createDeck.and.returnValue(of(newDeck));

    component.newDeckName = 'New Deck';
    component.showNewDeckForm = true;
    component.addNewDeck();

    expect(mockDeckService.createDeck).toHaveBeenCalledWith('New Deck');
    expect(component.decks).toContain(newDeck);
    expect(component.newDeckName).toBe('');
    expect(component.showNewDeckForm).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should handle error when creating deck fails', () => {
    mockDeckService.createDeck.and.returnValue(throwError(() => new Error('Failed')));

    component.newDeckName = 'New Deck';
    component.addNewDeck();

    expect(component.errorMessage).toBe('Failed to create deck');
  });

  it('should delete deck after confirmation', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockDeckService.deleteDeck.and.returnValue(of(void 0));

    const initialLength = component.decks.length;
    component.deleteDeck('1');
    tick();

    expect(mockDeckService.deleteDeck).toHaveBeenCalledWith('1');
    expect(component.decks.length).toBe(initialLength - 1);
    expect(component.decks.find((d) => d.id === '1')).toBeUndefined();
  }));

  it('should not delete deck when confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const initialLength = component.decks.length;
    component.deleteDeck('1');

    expect(mockDeckService.deleteDeck).not.toHaveBeenCalled();
    expect(component.decks.length).toBe(initialLength);
  });
});
