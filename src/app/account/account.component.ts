import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserLoginDTO } from '../shared/models/user-login-dto';
import { Router } from '@angular/router';

@Component({  
  templateUrl: './account.component.html',  
  styleUrls: ['./account.component.scss'],
  providers: []
})
export class AccountComponent implements OnInit {
  userLoginDTO: UserLoginDTO = {email: '', password: ''};

  constructor(
    private authService: AuthService,
    private router: Router) { }
  ngOnInit() {
  }
  onLoginClick() {
    this.login();
  }

  async login() {
      (await this.authService.login(this.userLoginDTO)).subscribe(
        next => {
          console.log('Logged in successfully');
        },
        error => {
          console.log(error);
        },
        () => {
          this.router.navigate(['/events']);
        }
    );
  }
}
