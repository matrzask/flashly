import { Component } from '@angular/core';
import { Flashcard } from '../../components/flashcard/flashcard';
import { Card } from '../../types/card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/cardService';
import { Location } from '@angular/common';

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
  loading: boolean = false;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.deckId = params.get('id') || '';
      this.loadFlashcards();
    });
  }

  loadFlashcards() {
    this.loading = true;
    this.cardService.getFlashcardsByDeckId(this.deckId).then((cards: Card[]) => {
      this.flashcards = cards;
      this.loading = false;
    });
  }

  changeCard(dir: number) {
    const newIndex = this.currentIndex + dir;
    if (newIndex >= 0 && newIndex < this.flashcards.length) {
      this.currentIndex = newIndex;
    }
  }

  navigateBack() {
    this.location.back();
  }
}
