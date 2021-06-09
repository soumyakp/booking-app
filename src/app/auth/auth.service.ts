import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private $userIsAuthenticated = true;
  private $userId = 'abc';
  // private $userIsAuthenticated = false;

  get userIsAuthenticated(): boolean {
    return this.$userIsAuthenticated;
  }

  get userId(): string {
    return this.$userId;
  }

  constructor() {}

  login(): void {
    this.$userIsAuthenticated = true;
  }

  logout(): void {
    this.$userIsAuthenticated = false;
  }
}
