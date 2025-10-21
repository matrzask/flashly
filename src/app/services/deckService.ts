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
    },
    {
      id: '2',
      name: 'Web Development',
    },
    {
      id: '3',
      name: 'Japanese Vocabulary',
    },
  ];

  cardsByDeck: { [key: string]: { front: string; back: string }[] } = {
    '1': [
      {
        front: 'What is a variable?',
        back: 'A storage location paired with an associated symbolic name.',
      },
      {
        front: 'What is a function?',
        back: 'A block of code designed to perform a particular task.',
      },
    ],
    '2': [
      { front: 'What does HTML stand for?', back: 'HyperText Markup Language' },
      { front: 'What is CSS used for?', back: 'Styling web pages' },
    ],
    '3': [
      { front: 'こんにちは', back: 'Hello' },
      { front: 'ありがとう', back: 'Thank you' },
      { front: 'さようなら', back: 'Goodbye' },
    ],
  };

  async getDecks(): Promise<Deck[]> {
    // Simulate an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.placeholderDecks);
      }, 1);
    });
  }

  async getFlashcardsByDeckId(deckId: string): Promise<{ front: string; back: string }[]> {
    // Simulate an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.cardsByDeck[deckId] || []);
      }, 1);
    });
  }
}
