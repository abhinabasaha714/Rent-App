import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users';
  private loggedInUserKey = 'loggedInUser';
  public loginStatus = new Subject<boolean>();

  constructor(private router: Router) {}

  public signup(user: { username: string; password: string }): boolean {
    const users = this.getUsers();
    if (users.find((u) => u.username === user.username)) {
      return false;
    }
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  public login(user: { username: string; password: string }): boolean {
    const users = this.getUsers();
    const authenticatedUser = users.find(
      (u) => u.username === user.username && u.password === user.password
    );
    if (authenticatedUser) {
      localStorage.setItem(
        this.loggedInUserKey,
        JSON.stringify(authenticatedUser)
      );
      this.loginStatus.next(true)
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
    this.loginStatus.next(false);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInUserKey) !== null;
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}
