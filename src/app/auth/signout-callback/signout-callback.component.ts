import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-callback',
  templateUrl: './signout-callback.component.html'
})
export class SignOutCallbackComponent implements OnInit {
  constructor(private _authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this._authService.signout().then(_ => {
      this.router.navigate(['/'], { replaceUrl: true} );
    })  
  }
}