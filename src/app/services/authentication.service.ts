import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs'; 

import { Constants } from '../shared/constants';
import { BaseService } from '../shared/base.service';
import { ConfigService } from '../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService  {

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(this.getClientSettings());
  private user: User | null;

  constructor(private http: HttpClient, private _configService: ConfigService) { 
    super();     
    
    this.manager.getUser().then(user => { 
      this.user = user;      
      this._authNavStatusSource.next(this.isAuthenticated());
    });
  }

  async signin() { 
    return await this.manager.signinRedirect();
  }

  async completeAuthentication() {
      this.user = await this.manager.signinRedirectCallback();
      this._authNavStatusSource.next(this.isAuthenticated());      
  }  

  register(userRegistration: any) {    
    return this.http.post('https://localhost:5001/account/register', userRegistration);
    //.pipe(catchError(this.handleError));
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  async signout() {
    await this.manager.signoutRedirect();
  }

  getClientSettings(): UserManagerSettings {
    return {
        authority: this._configService.authApiURI,
        client_id: this._configService.clinetId,
        redirect_uri: 'http://localhost:4200/auth-callback',
        post_logout_redirect_uri: 'http://localhost:4200/',
        response_type:"id_token token",
        scope:"openid profile email calendareventsapi.post",
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,      
        silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
    };
  }
}