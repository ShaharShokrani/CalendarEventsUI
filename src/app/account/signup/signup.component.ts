import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators'
import { UserRegistration } from 'src/app/shared/user-registration.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  success: boolean;
  error: string;
  userRegistration: UserRegistration = { name: '', email: '', password: ''};
  submitted: boolean = false;

  signUpForm: FormGroup;

  constructor(private _authenticationService: AuthService, private spinner: NgxSpinnerService) {   
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit(form: NgForm) { 
    this.spinner.show();    
    this._authenticationService.register(this.signUpForm.value)
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

  initForm() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),      
      password: new FormControl(null, [Validators.required, this.validatePasswordFunction.bind(this)])
    });
  }

  validatePasswordFunction(control: FormControl): {[s: string]: boolean} {
    if (!control.touched && !control.dirty)
      return null;
    
    var errors: {[s: string]: boolean} = {};

    if (control.value.length > 20)
      errors["MaxRuleValidation"] = true;
    if (control.value.length < 6)
      errors["MinRuleValidation"] = true;
    if (!this.hasLowerCase(control.value))
      errors["LowerRuleValidation"] = true;
    if (!this.hasUpperCase(control.value))
      errors["UpperRuleValidation"] = true;
    if (!this.hasSpecial(control.value))
      errors["SpecialRuleValidation"] = true;
    
    if (Object.keys(errors).length !== 0)
      return errors;
    
    return null; // If there is no error at al the errors list should be null.
  }

  hasLowerCase(str) {
    return (/[a-z]/.test(str));
  }

  hasUpperCase(str) {
    return (/[A-Z]/.test(str));
  }

  hasSpecial(str) {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str);
  }
}