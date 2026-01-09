import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Flashcard } from './flashcard';
import { Card } from '../../types/card';
import { provideHttpClient } from '@angular/common/http';

describe('Flashcard', () => {
  let component: Flashcard;
  let fixture: ComponentFixture<Flashcard>;
  let mockCard: Card;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flashcard],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Flashcard);
    component = fixture.componentInstance;

    mockCard = {
      id: '123',

      front: 'What is Angular?',
      back: 'A TypeScript framework',
    };

    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with flipped as false', () => {
    expect(component.flipped).toBe(false);
  });

  it('should display card data', () => {
    expect(component.card).toEqual(mockCard);
    expect(component.card.front).toBe('What is Angular?');
    expect(component.card.back).toBe('A TypeScript framework');
  });

  it('should toggle flipped state when toggle() is called', () => {
    expect(component.flipped).toBe(false);

    component.toggle();
    expect(component.flipped).toBe(true);

    component.toggle();
    expect(component.flipped).toBe(false);
  });
});
