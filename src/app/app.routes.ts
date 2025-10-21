import { Routes } from '@angular/router';
import { StudyDeck } from './pages/learn-deck/study-deck';
import { DeckList } from './pages/deck-list/deck-list';

export const routes: Routes = [
  { path: '', redirectTo: '/study/1', pathMatch: 'full' },
  { path: 'study/:id', component: StudyDeck },
  { path: 'decks', component: DeckList },
];
