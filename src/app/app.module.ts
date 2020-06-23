import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.model';

import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { SignUpComponent } from './account/signup/signup.component';

@NgModule({
  declarations: [  
    SignUpComponent,      
    AboutComponent, 
    AccountComponent,
    AppComponent,
    HeaderComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,    
    AppRoutingModule,    
    HttpClientModule,
    SharedModule,    
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }