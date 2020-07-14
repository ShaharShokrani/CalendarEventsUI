import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin-callback',
  templateUrl: './signin-callback.component.html',  
})
export class SignInCallbackComponent implements OnInit {
  error: boolean;

  constructor(private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    console.log("AuthCallbackComponent.ngOnInit");
    await this.authService.completeAuthentication();      
    this.router.navigate(['/events']);
  }
}