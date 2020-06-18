import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'oidc-client';
import { Constants } from '../shared/constants';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${Constants.stsAuthority}/users`);
    }

    register(user: User) {
        return this.http.post(`${Constants.stsAuthority}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${Constants.stsAuthority}/users/${id}`);
    }
}