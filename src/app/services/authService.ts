import { Injectable } from '@angular/core';
import { User, UserRole } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async login(email: string, password: string): Promise<User> {
    // Placeholder: Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: UserRole.USER,
        };
        this.currentUser = user;
        console.log('User logged in:', user);
        resolve(user);
      }, 500);
    });
  }

  async register(name: string, email: string, password: string): Promise<User> {
    // Placeholder: Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          role: UserRole.USER,
        };
        this.currentUser = user;
        console.log('User registered:', user);
        resolve(user);
      }, 500);
    });
  }

  logout(): void {
    this.currentUser = null;
    console.log('User logged out');
  }
}
