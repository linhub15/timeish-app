import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  isAuthenticated$ = new Subject<boolean>();

  constructor(
    apiService: ApiService,
    jwtService: JwtService) { }

  login(userName: string, password: string): boolean {
    if (userName === 'bob' && password === 'password') {
      this.isAuthenticated$.next(true);
      return true;
    } else {
      this.isAuthenticated$.next(false);
      return false;
    } 
  }
}
