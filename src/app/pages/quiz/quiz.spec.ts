import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quiz } from './quiz';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CardService } from '../../services/cardService';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('Quiz', () => {
  let component: Quiz;
  let fixture: ComponentFixture<Quiz>;
  let mockCardService: jasmine.SpyObj<CardService>;

  beforeEach(async () => {
    mockCardService = jasmine.createSpyObj('CardService', ['getFlashcardsByDeckId']);
    mockCardService.getFlashcardsByDeckId.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [Quiz],
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

    fixture = TestBed.createComponent(Quiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
