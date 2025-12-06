import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginButtons } from './login-buttons';

describe('LoginButtons', () => {
  let component: LoginButtons;
  let fixture: ComponentFixture<LoginButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
