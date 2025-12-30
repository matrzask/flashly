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
  errorMessage: string = '';

  constructor(private deckService: DeckService) {}

  async ngOnInit() {
    this.deckService.getDecks().subscribe((decks: Deck[]) => {
      this.decks = decks;
    });
  }

  addNewDeck() {
    if (!this.newDeckName.trim()) {
      this.errorMessage = 'Deck name cannot be empty';
      return;
    }

    this.errorMessage = '';
    this.addingDeck = true;

    this.deckService.createDeck(this.newDeckName).subscribe({
      next: (newDeck: Deck) => {
        this.decks.push(newDeck);
        this.newDeckName = '';
        this.showNewDeckForm = false;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to create deck';
      },
      complete: () => {
        this.addingDeck = false;
      },
    });
  }

  deleteDeck(id: string) {
    if (!confirm('Are you sure you want to delete this deck?')) {
      return;
    }
    this.deckService.deleteDeck(id).subscribe(() => {
      this.decks = this.decks.filter((deck) => deck.id !== id);
    });
  }

  toggleNewDeckForm() {
    this.showNewDeckForm = !this.showNewDeckForm;
    this.errorMessage = '';
    this.newDeckName = '';
  }
}
