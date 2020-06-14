import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',  
})
export class AuthCallbackComponent implements OnInit {
  error: boolean;

  constructor(private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute) {}

  async ngOnInit() {
    console.log("AuthCallbackComponent.ngOnInit");
    // check for error
    if (this.route.snapshot.fragment.indexOf('error') >= 0) {
        this.error=true; 
        return;    
    }  

    await this.authService.completeAuthentication();      
    this.router.navigate(['/events']);
  }
}