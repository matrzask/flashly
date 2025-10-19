import { Routes } from '@angular/router';
import { StudyDeck } from './pages/learn-deck/study-deck';

export const routes: Routes = [
  { path: '', redirectTo: '/study/1', pathMatch: 'full' },
  { path: 'study/:id', component: StudyDeck },
];
