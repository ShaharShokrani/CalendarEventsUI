import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './signup/signup.component';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent,
    SignUpComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    SharedModule
  ],
  exports: [
  ]
})
export class AccountModule {}