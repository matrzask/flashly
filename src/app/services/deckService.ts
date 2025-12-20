import { Injectable } from '@angular/core';
import { Deck } from '../types/deck';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private path = 'http://localhost:3000/decks';
  constructor(private http: HttpClient) {}

  getDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.path);
  }

  getPublicDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.path}/public`);
  }

  getDeckById(deckId: string): Observable<Deck | null> {
    return this.http.get<Deck>(`${this.path}/${deckId}`);
  }

  createDeck(name: string): Observable<Deck> {
    return this.http.post<Deck>(this.path, { name });
  }

  deleteDeck(deckId: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${deckId}`);
  }

  updateDeck(deck: Deck): Observable<Deck> {
    return this.http.put<Deck>(`${this.path}/${deck.id}`, { name: deck.name, public: deck.public });
  }
}
