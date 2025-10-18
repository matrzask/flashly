import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Flashcard } from './flashcard/flashcard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Flashcard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('flashly');
}
