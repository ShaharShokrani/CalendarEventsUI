import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthCallbackComponent } from './auth-callback.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthCallbackComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthCallbackComponent }]),
    SharedModule
  ],
  providers: []
})
export class AuthModule {}