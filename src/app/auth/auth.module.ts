import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SignInCallbackComponent } from './signin-callback/signin-callback.component';
import { SignOutCallbackComponent } from './signout-callback/signout-callback.component';

@NgModule({
  declarations: [
    SignInCallbackComponent,
    SignOutCallbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SignInCallbackComponent }]),
    SharedModule
  ],
  providers: []
})
export class AuthModule {}