import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/authService';
import { map } from 'rxjs/operators';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    map((currentUser) => {
      if (!currentUser?.user) {
        return true;
      }
      router.navigate(['/decks']);
      return false;
    })
  );
};
