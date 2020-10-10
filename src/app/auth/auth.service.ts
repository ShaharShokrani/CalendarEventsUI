import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthAPIService } from './auth-api.service';
import { UserRegisterDTO } from '../shared/models/user-register-dto';

import { BaseService } from '../shared/base.service';
import { ConfigService } from '../shared/config.service';
import { UserProfile } from '../shared/models/user-profile.model';
import { UserLoginDTO } from '../shared/models/user-login-dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService  {

  private _currentUserSubject: BehaviorSubject<boolean>;  
  public currentUser$ : Observable<boolean>;
    
  jwtHelper = new JwtHelperService();
  decodedToken: any;    

  constructor(private _authAPIService: AuthAPIService) { 
    super();    
    this._currentUserSubject = new BehaviorSubject<boolean>(this.isAuthenticated);
    this.currentUser$ = this._currentUserSubject.asObservable();
  }

  async register(userForRegisterDTO: UserRegisterDTO) { 
    return this._authAPIService.register(userForRegisterDTO);
  }

  async login(userLoginDTO: UserLoginDTO) {
    return this._authAPIService.login(userLoginDTO)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);          
          this._currentUserSubject.next(this.isAuthenticated);
          return user;
        }
      })
    );
  }

  get isAuthenticated(): boolean {    
    const token = localStorage.getItem('token');
    if (token)
      return !this.jwtHelper.isTokenExpired(token);
    else
      return false;
  }

  get authorizationHeaderValue(): string {
    if (this.isAuthenticated) {
      const token = localStorage.getItem('token');
      return "Bearer " + token;      
    }
    else {
      return '';
    }      
  }

  async signout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this._currentUserSubject.next(this.isAuthenticated); 
  }
}