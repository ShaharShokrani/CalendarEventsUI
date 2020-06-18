import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserRegistration } from 'src/app/shared/user-registration.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  success: boolean;
  error: string;
  userRegistration: UserRegistration = { name: '', email: '', password: ''};
  submitted: boolean = false;

  constructor(private _authenticationService: AuthenticationService, private spinner: NgxSpinnerService) {   
  }

  ngOnInit() {
  }

  onSubmit() { 
    this.spinner.show();

    this._authenticationService.register(this.userRegistration)
      .pipe(finalize(() => {
        this.spinner.hide();
      }))  
      .subscribe(
      result => {         
         if(result) {
           this.success = true;
         }
      },
      error => {
        this.error = error;       
      });
  }
}