import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    SharedModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class AccountModule {}