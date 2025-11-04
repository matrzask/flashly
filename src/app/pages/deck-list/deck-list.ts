import { Component } from '@angular/core';
import { DeckService } from '../../services/deckService';
import { Deck } from '../../types/deck';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deck-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './deck-list.html',
  styleUrl: './deck-list.scss',
})
export class DeckList {
  decks: Deck[] = [];
  showNewDeckForm: boolean = false;
  newDeckName: string = '';
  addingDeck: boolean = false;

  constructor(private deckService: DeckService) {}

  async ngOnInit() {
    this.deckService.getDecks().then((decks) => {
      this.decks = decks;
    });
  }

  addNewDeck() {
    if (this.newDeckName.trim()) {
      this.addingDeck = true;

      this.deckService
        .createDeck(this.newDeckName)
        .then((newDeck) => {
          this.decks.push(newDeck);
          this.newDeckName = '';
          this.showNewDeckForm = false;
        })
        .finally(() => {
          this.addingDeck = false;
        });
    }
  }

  toggleNewDeckForm() {
    this.showNewDeckForm = !this.showNewDeckForm;
  }
}
