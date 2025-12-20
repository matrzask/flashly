import { Component } from '@angular/core';
import { LoginButtons } from '../login-buttons/login-buttons';
import { RouterModule } from '@angular/router';
import { ThemeSelect } from '../theme-select/theme-select';
import { User } from '../../types/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/authService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [LoginButtons, RouterModule, ThemeSelect, CommonModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  user: User | null = null;
  private userSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser?.user || null;
      console.log('TopBar user:', this.user);
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
