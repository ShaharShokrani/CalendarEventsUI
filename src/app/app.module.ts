import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.model';

import { HeaderComponent } from './header/header.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './account/register/register.component';
import { EventsModule } from './events/events.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AccountModule } from './account/account.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
//import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [      
    AboutComponent,     
    AppComponent,
    HeaderComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,    
    SharedModule,
    FormsModule,
    AccountModule,
    ReactiveFormsModule,
    AuthModule,
    EventsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }