import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({  
  templateUrl: './account.component.html',  
  providers: []
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  ngOnInit() {
  }
  onSignInClick() {
    this.authService.signin();
  }
}
