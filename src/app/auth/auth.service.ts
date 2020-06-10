import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, from } from 'rxjs';

import { UserManager, User, Profile, UserSettings, OidcClientSettings } from 'oidc-client';

import { Router } from '@angular/router';
//import { AuthModule } from './auth.module';
import { Constants } from '../shared/constants';
//import { AppModule } from '../app.module';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private _userManager: UserManager = new UserManager(getClientSettings());  
  private _user: User | null;    

  constructor(private http: HttpClient,private router: Router) {}

  logout() {
    this._authNavStatusSource.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  get authorizationHeaderValue(): string {
    return `${this._user.token_type} ${this._user.access_token}`;
  }

  signup(email: string, password: string) {
  }

  async completeAuthentication() {
    this._user = await this._userManager.signinRedirectCallback();    
    this._authNavStatusSource.next(this.isAuthenticated());
  }  
  isAuthenticated(): boolean {
    return this._user != null && !this._user.expired;
  }
  login() {
    this._userManager.signinRedirect();
  }
}

export function getClientSettings(): OidcClientSettings {  
  return {
    authority: Constants.stsAuthority,        
    client_id: Constants.clientId,
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    scope: 'openid profile',
    response_type: 'id_token token',        
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}