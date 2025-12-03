import { Routes } from '@angular/router';
import { StudyDeck } from './pages/learn-deck/study-deck';
import { DeckList } from './pages/deck-list/deck-list';
import { EditDeck } from './pages/edit-deck/edit-deck';

export const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'study/:id', component: StudyDeck },
  { path: 'decks', component: DeckList },
  { path: 'edit/:id', component: EditDeck },
];
