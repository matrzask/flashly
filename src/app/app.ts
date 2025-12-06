import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from './types/card';
import { TopBar } from './components/top-bar/top-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('flashly');
  card: Card = {
    front: 'What is Angular?',
    back: 'A platform for building mobile and desktop web applications.',
  };
}
