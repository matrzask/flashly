import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeckService } from '../../services/deckService';
import { Deck } from '../../types/deck';
import { User } from '../../types/user';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../services/authService';
import { SearchQuery } from '../../types/search-query';
import { SearchResponse } from '../../types/search-response';

@Component({
  selector: 'app-public-decks',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './public-decks.html',
  styleUrl: './public-decks.scss',
})
export class PublicDecks {
  decks: Deck[] = [];
  user: User | null = null;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  loading: boolean = false;
  searchName: string = '';
  searchAuthor: string = '';
  private userSubscription?: Subscription;
  private searchSubscription?: Subscription;
  private searchSubject = new Subject<{ name: string; author: string }>();

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.searchSubject.complete();
  }

  constructor(private deckService: DeckService, private authService: AuthService) {}

  ngOnInit() {
    this.loadDecks();

    this.userSubscription = this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser?.user || null;
    });

    // Set up debounced search
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => prev.name === curr.name && prev.author === curr.author)
      )
      .subscribe(() => {
        this.page = 1; // Reset to first page on new search
        this.loadDecks();
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

  loadDecks() {
    const query: SearchQuery = {
      page: this.page,
      limit: this.limit,
    };

    if (this.searchName.trim()) {
      query.name = this.searchName.trim();
    }

    if (this.searchAuthor.trim()) {
      query.author = this.searchAuthor.trim();
    }

    this.loading = true;
    this.deckService.getPublicDecks(query).subscribe({
      next: (resp: SearchResponse<Deck>) => {
        this.decks = resp.data;
        this.totalPages = resp.pagination.totalPages;
        this.totalItems = resp.pagination.totalItems;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSearchChange() {
    this.searchSubject.next({ name: this.searchName, author: this.searchAuthor });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadDecks();
    }
  }

  nextPage() {
    this.goToPage(this.page + 1);
  }

  prevPage() {
    this.goToPage(this.page - 1);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
