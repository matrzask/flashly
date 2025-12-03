import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
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
    '4': [
      {
        front: 'Explain the concept of recursion in programming.',
        back: 'Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem, often involving a function calling itself.',
      },
      {
        front: 'What is the difference between HTTP and HTTPS?',
        back: 'HTTP (HyperText Transfer Protocol) is used for transferring data over the web, while HTTPS (HTTP Secure) adds encryption via SSL/TLS to ensure secure communication.',
      },
    ],
  };

  async getFlashcardsByDeckId(deckId: string): Promise<{ front: string; back: string }[]> {
    // Simulate an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.cardsByDeck[deckId] || [{ front: 'Card front', back: 'Card back' }]);
      }, 1);
    });
  }

  async updateFlashcards(deckId: string, cards: { front: string; back: string }[]): Promise<void> {
    // Simulate updating flashcards for a deck
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1);
    });
  }
}
