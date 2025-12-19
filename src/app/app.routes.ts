import { Routes } from '@angular/router';
import { StudyDeck } from './pages/study-deck/study-deck';
import { DeckList } from './pages/deck-list/deck-list';
import { EditDeck } from './pages/edit-deck/edit-deck';
import { PublicDecks } from './pages/public-decks/public-decks';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'study/:id', component: StudyDeck },
  { path: 'decks', component: DeckList },
  { path: 'edit/:id', component: EditDeck },
  { path: 'public-decks', component: PublicDecks },
];
