import { Component } from '@angular/core';
import { DeckService } from '../../services/deckService';
import { Deck } from '../../types/deck';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.scss',
})
export class DeckList {
  decks: Deck[] = [];

  constructor(private deckService: DeckService) {}

  async ngOnInit() {
    this.deckService.getDecks().then((decks) => {
      this.decks = decks;
    });
  }
}
