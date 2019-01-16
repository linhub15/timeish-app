import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>({})

  private _isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  isAuthenticated = this._isAuthenticatedSubject.asObservable();
  constructor(
    apiService: ApiService,
    jwtService: JwtService) { }

  
}
