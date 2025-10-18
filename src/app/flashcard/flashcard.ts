import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  imports: [],
  templateUrl: './flashcard.html',
  styleUrl: './flashcard.scss',
})
export class Flashcard {
  @Input() front: string = '';
  @Input() back: string = '';

  flipped: boolean = false;

  toggle() {
    this.flipped = !this.flipped;
  }
}
