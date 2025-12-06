import { Injectable } from '@angular/core';
import { User, UserRole } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getCurrentUser(): User | null {
    return null;
    return { id: '1', name: 'John Doe', email: 'jodo@gmail.com', role: UserRole.USER };
  }
}
