import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators'
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserLoginDTO } from 'src/app/shared/models/user-login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLoginDTO: UserLoginDTO = {email: '', password: ''};
  success: boolean;
  error: string;  
  submitted: boolean = false;

  loginForm: FormGroup;  

  constructor(
    private _authService: AuthService,    
    private _spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initForm();
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