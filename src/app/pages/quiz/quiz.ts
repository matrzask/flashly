import { Component } from '@angular/core';
import { CardService } from '../../services/cardService';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../types/card';
import { CommonModule } from '@angular/common';

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizCard {
  question: string;
  correctAnswer: string;
  options: QuizOption[];
}

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  deckId: string = '';
  cards: Card[] = [];
  quizCards: QuizCard[] = [];
  currentQuizIndex: number = 0;
  selectedOption: number | null = null;
  showResult: boolean = false;
  score: number = 0;
  answeredCount: number = 0;
  quizComplete: boolean = false;
  loading: boolean = true;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.deckId = params.get('id') || '';
      this.loadCards();
    });
  }

  loadCards() {
    this.cardService.getFlashcardsByDeckId(this.deckId).subscribe({
      next: (cards) => {
        this.cards = cards;
        if (cards.length < 2) {
          alert('You need at least 2 flashcards to start a quiz!');
          this.router.navigate(['/decks']);
          return;
        }
        this.generateQuiz();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading cards:', err);
        this.loading = false;
      },
    });
  }

  generateQuiz() {
    // Shuffle cards
    const shuffledCards = [...this.cards].sort(() => Math.random() - 0.5);

    this.quizCards = shuffledCards.map((card) => {
      // Get 3 random incorrect answers from other cards
      const otherCards = this.cards.filter((c) => c.id !== card.id);
      const incorrectOptions = this.getRandomItems(otherCards, 3).map((c) => c.back);

      // Combine correct answer with incorrect ones and shuffle
      const allOptions = [card.back, ...incorrectOptions];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

      return {
        question: card.front,
        correctAnswer: card.back,
        options: shuffledOptions.map((text) => ({
          text,
          isCorrect: text === card.back,
        })),
      };
    });
  }

  getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, array.length));
  }

  get currentQuiz(): QuizCard | null {
    return this.quizCards[this.currentQuizIndex] || null;
  }

  selectOption(index: number) {
    if (this.showResult) return;
    this.selectedOption = index;
  }

  submitAnswer() {
    if (this.selectedOption === null || !this.currentQuiz) return;

    this.showResult = true;
    this.answeredCount++;

    if (this.currentQuiz.options[this.selectedOption].isCorrect) {
      this.score++;
    }
  }

  nextQuestion() {
    if (this.currentQuizIndex < this.quizCards.length - 1) {
      this.currentQuizIndex++;
      this.selectedOption = null;
      this.showResult = false;
    } else {
      this.quizComplete = true;
    }
  }

  restartQuiz() {
    this.currentQuizIndex = 0;
    this.selectedOption = null;
    this.showResult = false;
    this.score = 0;
    this.answeredCount = 0;
    this.quizComplete = false;
    this.generateQuiz();
  }

  exitQuiz() {
    this.router.navigate(['/decks']);
  }
}
