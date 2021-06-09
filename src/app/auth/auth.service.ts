import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private $userIsAuthenticated = true;
  // private $userIsAuthenticated = false;

  get userIsAuthenticated(): boolean {
    return this.$userIsAuthenticated;
  }

  constructor() {}

  login(): void {
    this.$userIsAuthenticated = true;
  }

  logout(): void {
    this.$userIsAuthenticated = false;
  }
}
