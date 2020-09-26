import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators'
import { UserRegistration } from 'src/app/shared/user-registration.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  success: boolean;
  error: string;  
  submitted: boolean = false;

  registerForm: FormGroup;

  constructor(private _authenticationService: AuthService, private spinner: NgxSpinnerService) {   
  }

  ngOnInit() {
    this.initForm();
  }

  async onSubmit(form: NgForm) { 
    this.spinner.show();    
    (await this._authenticationService.register(this.registerForm.value))
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
    this.registerForm = new FormGroup({      
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