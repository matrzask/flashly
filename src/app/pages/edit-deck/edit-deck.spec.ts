import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDeck } from './edit-deck';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../services/deckService';
import { CardService } from '../../services/cardService';
import { of } from 'rxjs';
import { Deck } from '../../types/deck';
import { Card } from '../../types/card';
import { provideHttpClient } from '@angular/common/http';

describe('EditDeck', () => {
  let component: EditDeck;
  let fixture: ComponentFixture<EditDeck>;
  let mockDeckService: jasmine.SpyObj<DeckService>;
  let mockCardService: jasmine.SpyObj<CardService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockDeck: Deck = {
    id: '123',
    name: 'Test Deck',
    public: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCards: Card[] = [
    { id: '1', front: 'Question 1', back: 'Answer 1' },
    { id: '2', front: 'Question 2', back: 'Answer 2' },
  ];

  beforeEach(async () => {
    mockDeckService = jasmine.createSpyObj('DeckService', ['getDeckById', 'updateDeck']);
    mockCardService = jasmine.createSpyObj('CardService', [
      'getFlashcardsByDeckId',
      'addFlashcard',
      'updateFlashcard',
      'deleteFlashcard',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      paramMap: of(new Map([['id', '123']])),
    };

    mockDeckService.getDeckById.and.returnValue(of(mockDeck));
    mockCardService.getFlashcardsByDeckId.and.returnValue(of(mockCards));

    await TestBed.configureTestingModule({
      imports: [EditDeck],
      providers: [
        { provide: DeckService, useValue: mockDeckService },
        { provide: CardService, useValue: mockCardService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.newCardFront).toBe('');
    expect(component.newCardBack).toBe('');
    expect(component.editingCardIndex).toBeNull();
    expect(component.saving).toBe(false);
  });

  it('should load deck and cards on initialization', () => {
    expect(component.deck).toEqual(mockDeck);
    expect(component.cards).toEqual(mockCards);
    expect(mockDeckService.getDeckById).toHaveBeenCalledWith('123');
    expect(mockCardService.getFlashcardsByDeckId).toHaveBeenCalledWith('123');
  });

  it('should update deck when saveDeck is called', () => {
    const updatedDeck = { ...mockDeck, name: 'Updated Deck' };
    mockDeckService.updateDeck.and.returnValue(of(updatedDeck));

    component.deck = mockDeck;
    component.saveDeck();

    expect(mockDeckService.updateDeck).toHaveBeenCalledWith(mockDeck);
  });

  it('should add new card', () => {
    const newCard: Card = { id: '3', front: 'New Q', back: 'New A' };
    mockCardService.addFlashcard.and.returnValue(of(newCard));

    component.deck = mockDeck;
    component.newCardFront = 'New Q';
    component.newCardBack = 'New A';

    component.addCard();

    expect(mockCardService.addFlashcard).toHaveBeenCalledWith('123', {
      front: 'New Q',
      back: 'New A',
    });
    expect(component.cards).toContain(newCard);
    expect(component.newCardFront).toBe('');
    expect(component.newCardBack).toBe('');
  });

  it('should not add card with empty front', () => {
    component.deck = mockDeck;
    component.newCardFront = '   ';
    component.newCardBack = 'Answer';

    component.addCard();

    expect(mockCardService.addFlashcard).not.toHaveBeenCalled();
  });

  it('should start editing card', () => {
    component.cards = mockCards;
    component.startEditCard(0);

    expect(component.editingCardIndex).toBe(0);
    expect(component.editFront).toBe('Question 1');
    expect(component.editBack).toBe('Answer 1');
  });

  it('should cancel editing', () => {
    component.editingCardIndex = 0;
    component.editFront = 'Some text';
    component.editBack = 'Some answer';

    component.cancelEdit();

    expect(component.editingCardIndex).toBeNull();
    expect(component.editFront).toBe('');
    expect(component.editBack).toBe('');
  });
});
