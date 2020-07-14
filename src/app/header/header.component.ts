import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  collapsed: boolean = false;
    
  constructor(private authService: AuthService ) { }

  ngOnInit() {
    this.userSub = this.authService.authNavStatus$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  onLogout() {
    this.authService.signout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}