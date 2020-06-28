import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({  
  templateUrl: './account.component.html',  
  providers: []
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService) { }
  ngOnInit() {
  }
  onSignInClick() {
    this.authService.signin();
  }
}
