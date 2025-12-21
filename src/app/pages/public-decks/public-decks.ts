import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeckService } from '../../services/deckService';
import { Deck } from '../../types/deck';
import { User } from '../../types/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-public-decks',
  imports: [CommonModule, RouterModule],
  templateUrl: './public-decks.html',
  styleUrl: './public-decks.scss',
})
export class PublicDecks {
  decks: Deck[] = [];
  user: User | null = null;
  private userSubscription?: Subscription;

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  constructor(private deckService: DeckService, private authService: AuthService) {}

  ngOnInit() {
    this.deckService.getPublicDecks().subscribe((decks: Deck[]) => {
      this.decks = decks;
    });

    this.userSubscription = this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser?.user || null;
      console.log('TopBar user:', this.user);
    });
  }

  copyDeck(deck: Deck) {
    if (!this.user) {
      alert('You must be logged in to copy a deck.');
      return;
    }

    this.deckService.copyPublicDeck(deck.id).subscribe({
      next: (newDeck: Deck) => {
        alert(`Deck "${deck.name}" copied successfully!`);
      },
      error: () => {
        alert('Failed to copy deck.');
      },
    });
  }
}
