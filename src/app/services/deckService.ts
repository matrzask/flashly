import { Injectable } from '@angular/core';
import { Deck } from '../types/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  placeholderDecks: Deck[] = [
    {
      id: '1',
      name: 'Programming Basics',
      public: true,
    },
    {
      id: '2',
      name: 'Web Development',
      public: false,
    },
    {
      id: '3',
      name: 'Japanese Vocabulary',
      public: true,
    },
    {
      id: '4',
      name: 'Advanced Computer Science',
      public: false,
    },
  ];

  async getDecks(): Promise<Deck[]> {
    // Simulate an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.placeholderDecks);
      }, 1);
    });
  }

  async createDeck(name: string): Promise<Deck> {
    // Simulate creating a new deck
    const newDeck: Deck = {
      id: (this.placeholderDecks.length + 1).toString(),
      name: name,
      public: false,
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newDeck);
      }, 1);
    });
  }

  async deleteDeck(deckId: string): Promise<void> {
    // Simulate deleting a deck
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1);
    });
  }

  async updateDeck(deck: Deck): Promise<Deck> {
    // Simulate updating a deck
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(deck);
      }, 1);
    });
  }
}
