import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeckService } from '../../services/deckService';
import { Deck } from '../../types/deck';

@Component({
  selector: 'app-public-decks',
  imports: [CommonModule, RouterModule],
  templateUrl: './public-decks.html',
  styleUrl: './public-decks.scss',
})
export class PublicDecks {
  decks: Deck[] = [];

  constructor(private deckService: DeckService) {}

  async ngOnInit() {
    this.deckService.getPublicDecks().then((decks) => {
      this.decks = decks;
    });
  }

  copyDeck(deck: Deck) {
    // TODO: implement copying a public deck into user's decks
    console.log('Copy deck clicked', deck);
  }
}
