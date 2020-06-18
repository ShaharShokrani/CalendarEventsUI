import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.model';

import { HeaderComponent } from './header/header.component';

import { AboutComponent } from './about/about.component'
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [    
    AppComponent,
    HeaderComponent,
    SignupComponent,
    AboutComponent    
  ],
  imports: [    
    BrowserModule,
    HttpModule, 
    FormsModule,
    AppRoutingModule,    
    HttpClientModule,
    SharedModule,
    CoreModule,
    AuthModule,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }