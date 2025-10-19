import { Component, Input } from '@angular/core';
import { Card } from '../../types/card';

@Component({
  selector: 'app-flashcard',
  imports: [],
  templateUrl: './flashcard.html',
  styleUrl: './flashcard.scss',
})
export class Flashcard {
  @Input() card!: Card;

  flipped: boolean = false;

  toggle() {
    this.flipped = !this.flipped;
  }
}
