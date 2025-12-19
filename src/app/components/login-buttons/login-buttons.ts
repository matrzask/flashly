import { Component } from '@angular/core';
import { AuthService } from '../../services/authService';
import { User } from '../../types/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-buttons',
  imports: [RouterModule],
  templateUrl: './login-buttons.html',
  styleUrl: './login-buttons.scss',
})
export class LoginButtons {
  user: User | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }
}
