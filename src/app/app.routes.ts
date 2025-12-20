import { Routes } from '@angular/router';
import { StudyDeck } from './pages/study-deck/study-deck';
import { DeckList } from './pages/deck-list/deck-list';
import { EditDeck } from './pages/edit-deck/edit-deck';
import { PublicDecks } from './pages/public-decks/public-decks';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },
  { path: 'study/:id', component: StudyDeck },
  { path: 'decks', component: DeckList, canActivate: [authGuard] },
  { path: 'edit/:id', component: EditDeck, canActivate: [authGuard] },
  { path: 'public-decks', component: PublicDecks },
];
