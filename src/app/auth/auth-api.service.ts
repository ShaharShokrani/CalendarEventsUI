import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfigService } from '../shared/config.service';
import { Observable, EMPTY } from 'rxjs';
import { UserRegisterDTO } from '../shared/models/user-register-dto';
import { UserDetailedDTO as UserDetailedDTO } from '../shared/models/user-detailed-dto';
import { UserLoginDTO } from '../shared/models/user-login-dto';
import { UserListDTO } from '../shared/models/user-list-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  constructor (
    private _httpClient: HttpClient,     
    private _configService: ConfigService
  ) {}

  register(userForRegisterDto: UserRegisterDTO) : Observable<UserDetailedDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this._httpClient
      .post<any>(
          this._configService.resourceApiURI + '/auth/register',
          userForRegisterDto,
          httpOptions
      );
  }

  login(userForRegisterDto: UserLoginDTO) : Observable<UserListDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this._httpClient
      .post<UserListDTO>(
          this._configService.resourceApiURI + '/auth/login',
          userForRegisterDto,
          httpOptions
      );
  }
}