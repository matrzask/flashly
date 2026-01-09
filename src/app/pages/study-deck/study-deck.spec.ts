import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyDeck } from './study-deck';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CardService } from '../../services/cardService';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('StudyDeck', () => {
  let component: StudyDeck;
  let fixture: ComponentFixture<StudyDeck>;
  let mockCardService: jasmine.SpyObj<CardService>;

  beforeEach(async () => {
    mockCardService = jasmine.createSpyObj('CardService', ['getFlashcardsByDeckId']);
    mockCardService.getFlashcardsByDeckId.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [StudyDeck],
      providers: [
        { provide: CardService, useValue: mockCardService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '123' })),
          },
        },
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyDeck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
