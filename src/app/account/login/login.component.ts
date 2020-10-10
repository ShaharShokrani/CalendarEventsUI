import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators'
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserLoginDTO } from 'src/app/shared/models/user-login-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLoginDTO: UserLoginDTO = {email: '', password: ''};
  success: boolean;
  error: string;  
  returnUrl: string;
  submitted: boolean = false;
  loginForm: FormGroup;    

  constructor(
    private _authService: AuthService,    
    private _spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.initForm();
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onSubmit() { 
    this._spinner.show();
    (await this._authService.login(this.loginForm.value))
      .pipe(finalize(() => {
        this._spinner.hide();
      }))  
      .subscribe(
        () => {                  
          this.success = true;
          this._router.navigate([this.returnUrl]);          
        },
      error => {
        this.error = error;       
      });
  }

  initForm() {
    this.loginForm = new FormGroup({      
      email: new FormControl('', [Validators.required, Validators.email]),      
      password: new FormControl(null, [Validators.required])
    });
  }
}