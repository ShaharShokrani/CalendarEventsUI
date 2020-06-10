import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  
  import { AuthService } from './auth.service';
  
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this._authService.isAuthenticated()) { return true; }
      this._router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
      return false;
    }
  }
  