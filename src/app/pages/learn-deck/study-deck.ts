import { Component } from '@angular/core';
import { Flashcard } from '../../components/flashcard/flashcard';
import { Card } from '../../types/card';
import { DeckService } from '../../services/deckService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-study-deck',
  imports: [Flashcard],
  templateUrl: './study-deck.html',
  styleUrl: './study-deck.scss',
})
export class StudyDeck {
  flashcards: Card[] = [];
  deckId: string = '';

  constructor(private deckService: DeckService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.deckId = params.get('id') || '';
      this.LoadFlashcards();
    });
  }

  LoadFlashcards() {
    this.deckService.getFlashcardsByDeckId(this.deckId).then((cards: Card[]) => {
      this.flashcards = cards;
    });
  }
}
