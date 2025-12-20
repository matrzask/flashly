import { Injectable } from '@angular/core';
import { User, UserRole } from '../types/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private path = 'http://localhost:3000/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
    console.log('User loaded from localStorage:', this.currentUserSubject.value);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.path}/login`, { email, password }).pipe(
      tap((response) => {
        const user = response.data.user;
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        if (user && token && refreshToken) {
          localStorage.setItem('currentUser', JSON.stringify({ user, token, refreshToken }));
          this.currentUserSubject.next({ user, token, refreshToken });
        }
        return response;
      })
    );
  }

  register(user: User, password: string) {
    return this.http.post<any>(`${this.path}/register`, { ...user, password }).pipe(
      tap((response) => {
        const user = response.data.user;
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        if (user && token && refreshToken) {
          localStorage.setItem('currentUser', JSON.stringify({ user, token, refreshToken }));
          this.currentUserSubject.next({ user, token, refreshToken });
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  refreshToken() {
    const currentUser = this.currentUserValue;
    return this.http
      .post<any>(`${this.path}/refresh`, {
        token: currentUser.refreshToken,
      })
      .pipe(
        tap((response) => {
          if (response.status === 'fail') {
            throw new Error(response.message);
          } else {
            const token = response.data.token;
            const refreshToken = response.data.refreshToken;
            if (token && refreshToken) {
              const user = currentUser.user;
              localStorage.setItem('currentUser', JSON.stringify({ user, token, refreshToken }));
              this.currentUserSubject.next({ user, token, refreshToken });
            }
          }
          return response;
        })
      );
  }
}
