import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Flashcard } from './components/flashcard/flashcard';
import { Card } from './types/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Flashcard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('flashly');
  card: Card = {
    front: 'What is Angular?',
    back: 'A platform for building mobile and desktop web applications.',
  };

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}
