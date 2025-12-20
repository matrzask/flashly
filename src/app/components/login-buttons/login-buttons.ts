import { Component } from '@angular/core';
import { AuthService } from '../../services/authService';
import { User } from '../../types/user';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-buttons',
  imports: [RouterModule],
  templateUrl: './login-buttons.html',
  styleUrl: './login-buttons.scss',
})
export class LoginButtons {
  user: User | null = null;
  private userSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser?.user || null;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
