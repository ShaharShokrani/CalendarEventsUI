import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.model';

import { HeaderComponent } from './header/header.component';

import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventItemComponent } from './events/events-list/event-item/event-item.component';
import { EventStartComponent } from './events/event-start/event-start.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AboutComponent } from './about/about.component'
import { EventService } from './events/event.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    DropdownDirective,
    AppComponent,
    HeaderComponent,
    EventsComponent,
    EventsListComponent,
    EventDetailComponent,
    EventEditComponent,
    EventItemComponent,
    EventStartComponent,
    AboutComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FullCalendarModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [EventService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, 
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }