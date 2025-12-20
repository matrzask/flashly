import { Injectable } from '@angular/core';
import { Card } from '../types/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private path = 'http://localhost:3000/cards';
  constructor(private http: HttpClient) {}

  getFlashcardsByDeckId(deckId: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.path}/${deckId}`);
  }

  addFlashcard(deckId: string, card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.path}/${deckId}`, { ...card });
  }

  updateFlashcard(deckId: string, card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.path}/${deckId}/${card.id}`, { ...card });
  }

  deleteFlashcard(deckId: string, cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.path}/${deckId}/${cardId}`);
  }
}
