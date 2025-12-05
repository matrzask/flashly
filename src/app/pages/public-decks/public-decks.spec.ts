import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDecks } from './public-decks';

describe('PublicDecks', () => {
  let component: PublicDecks;
  let fixture: ComponentFixture<PublicDecks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicDecks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicDecks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
