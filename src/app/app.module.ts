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

@NgModule({
  declarations: [    
    AppComponent,
    HeaderComponent,
    AboutComponent
  ],
  imports: [    
    BrowserModule,
    HttpModule, 
    AppRoutingModule,    
    HttpClientModule,    
    SharedModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }