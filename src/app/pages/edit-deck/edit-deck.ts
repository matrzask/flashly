import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from '../../types/deck';
import { Card } from '../../types/card';
import { DeckService } from '../../services/deckService';
import { CardService } from '../../services/cardService';

@Component({
  selector: 'app-edit-deck',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-deck.html',
  styleUrl: './edit-deck.scss',
})
export class EditDeck {
  deckId: string = '';
  deck: Deck | null = null;
  cards: Card[] = [];
  saving: boolean = false;

  // card add/edit state
  newCardFront: string = '';
  newCardBack: string = '';
  editingCardIndex: number | null = null;
  editFront: string = '';
  editBack: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService,
    private cardService: CardService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.deckId = params.get('id') || '';
      this.loadDeck();
      this.loadCards();
    });
  }

  async loadDeck() {
    this.deckService.getDeckById(this.deckId).subscribe((deck) => {
      this.deck = deck;
    });
  }

  async loadCards() {
    this.cardService.getFlashcardsByDeckId(this.deckId).subscribe((cards) => {
      this.cards = cards;
    });
  }

  async saveDeck() {
    if (!this.deck) return;
    this.saving = true;
    this.deckService.updateDeck(this.deck).subscribe({
      next: (updatedDeck) => {
        this.deck = updatedDeck;
        this.saving = false;
      },
      error: () => {
        console.error('Failed to update deck');
        this.saving = false;
      },
    });
  }

  async addCard() {
    if (!this.deck) return;
    const front = this.newCardFront.trim();
    const back = this.newCardBack.trim();
    if (!front) return;
    const newCard: Card = { front, back };
    this.cardService.addFlashcard(this.deck.id, newCard).subscribe((createdCard) => {
      this.cards.push(createdCard);
      this.newCardFront = '';
      this.newCardBack = '';
    });
  }

  startEditCard(index: number) {
    this.editingCardIndex = index;
    this.editFront = this.cards[index].front;
    this.editBack = this.cards[index].back;
  }

  cancelEdit() {
    this.editingCardIndex = null;
    this.editFront = '';
    this.editBack = '';
  }

  async saveCard(index: number) {
    const front = this.editFront.trim();
    const back = this.editBack.trim();
    if (!front) return;
    if (this.deck) {
      this.cardService
        .updateFlashcard(this.deck.id, {
          ...this.cards[index],
          front,
          back,
        })
        .subscribe((updatedCard) => {
          this.cards[index] = updatedCard;
          this.cancelEdit();
        });
    }
  }

  async deleteCard(index: number) {
    if (!confirm('Delete this card?')) return;
    if (this.deck) {
      this.cardService.deleteFlashcard(this.deck.id, this.cards[index].id!).subscribe(() => {
        this.cards.splice(index, 1);
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/decks']);
  }
}
