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
    this.deck = await this.deckService.getDeckById(this.deckId);
  }

  async loadCards() {
    this.cards = await this.cardService.getFlashcardsByDeckId(this.deckId);
  }

  async saveDeck() {
    if (!this.deck) return;
    this.saving = true;
    await this.deckService.updateDeck(this.deck);
    this.saving = false;
  }

  togglePublic() {
    if (!this.deck) return;
    this.deck.public = !this.deck.public;
  }

  async addCard() {
    if (!this.deck) return;
    const front = this.newCardFront.trim();
    const back = this.newCardBack.trim();
    if (!front) return;
    const newCard: Card = { id: Date.now().toString(), front, back };
    this.cards.push(newCard);
    this.newCardFront = '';
    this.newCardBack = '';
    await this.cardService.updateFlashcards(this.deck.id, this.cards);
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
    this.cards[index].front = front;
    this.cards[index].back = back;
    this.cancelEdit();
    if (this.deck) {
      await this.cardService.updateFlashcards(this.deck.id, this.cards);
    }
  }

  async deleteCard(index: number) {
    if (!confirm('Delete this card?')) return;
    this.cards.splice(index, 1);
    if (this.deck) {
      await this.cardService.updateFlashcards(this.deck.id, this.cards);
    }
  }

  navigateBack() {
    this.router.navigate(['/decks']);
  }
}
