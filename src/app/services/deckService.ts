import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  async getFlashcardsByDeckId(deckId: string): Promise<{ front: string; back: string }[]> {
    // Simulate an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { front: 'What is Angular?', back: 'A TypeScript-based web framework' },
          { front: 'What is TypeScript?', back: 'A superset of JavaScript' },
          { front: 'What is RxJS?', back: 'A library for reactive programming' },
        ]);
      }, 1);
    });
  }
}
