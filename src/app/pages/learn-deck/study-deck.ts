import { Component } from '@angular/core';
import { Flashcard } from '../../components/flashcard/flashcard';
import { Card } from '../../types/card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/cardService';

@Component({
  selector: 'app-study-deck',
  imports: [Flashcard],
  templateUrl: './study-deck.html',
  styleUrl: './study-deck.scss',
})
export class StudyDeck {
  flashcards: Card[] = [];
  deckId: string = '';
  currentIndex: number = 0;

  constructor(private cardService: CardService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.deckId = params.get('id') || '';
      this.loadFlashcards();
    });
  }

  loadFlashcards() {
    this.cardService.getFlashcardsByDeckId(this.deckId).then((cards: Card[]) => {
      this.flashcards = cards;
    });
  }

  changeCard(dir: number) {
    const newIndex = this.currentIndex + dir;
    if (newIndex >= 0 && newIndex < this.flashcards.length) {
      this.currentIndex = newIndex;
    }
  }
}
