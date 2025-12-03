import { Injectable } from '@angular/core';
import { Card } from '../types/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cardsByDeck: { [key: string]: Card[] } = {
    '1': [
      {
        id: '1',
        front: 'What is a variable?',
        back: 'A storage location paired with an associated symbolic name.',
      },
      {
        id: '2',
        front: 'What is a function?',
        back: 'A block of code designed to perform a particular task.',
      },
    ],
    '2': [
      { id: '3', front: 'What does HTML stand for?', back: 'HyperText Markup Language' },
      { id: '4', front: 'What is CSS used for?', back: 'Styling web pages' },
    ],
    '3': [
      { id: '5', front: 'こんにちは', back: 'Hello' },
      { id: '6', front: 'ありがとう', back: 'Thank you' },
      { id: '7', front: 'さようなら', back: 'Goodbye' },
    ],
    '4': [
      {
        id: '8',
        front: 'Explain the concept of recursion in programming.',
        back: 'Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem, often involving a function calling itself.',
      },
      {
        id: '9',
        front: 'What is the difference between HTTP and HTTPS?',
        back: 'HTTP (HyperText Transfer Protocol) is used for transferring data over the web, while HTTPS (HTTP Secure) adds encryption via SSL/TLS to ensure secure communication.',
      },
    ],
  };

  async getFlashcardsByDeckId(deckId: string): Promise<Card[]> {
    // Simulate an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.cardsByDeck[deckId] || [{ front: 'Card front', back: 'Card back' }]);
      }, 1);
    });
  }

  async updateFlashcards(deckId: string, cards: Card[]): Promise<void> {
    // Simulate updating flashcards for a deck
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Updated cards for deck ${deckId}:`, cards);
        resolve();
      }, 1);
    });
  }
}
