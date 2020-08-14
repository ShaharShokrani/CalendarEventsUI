import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EventsComponent } from './events.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventStartComponent } from './event-start/event-start.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EventFilterComponent } from './event-filter/event-filter.component';
import { EventsAPIService } from './events-api.service';
import { EventService } from './events.service';
import { EventsResolverService } from './events-resolver.service';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EventResolverService } from './event-resolver.service';
import { FiltersComponent } from '../filters/filters.component';
import { FilterComponent } from '../filters/filter/filter.component'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventDetailComponent,
    EventStartComponent,
    EventEditComponent,
    EventFilterComponent,
    FiltersComponent,
    FilterComponent
  ],
  imports: [
    ReactiveFormsModule,
    FullCalendarModule,
    EventsRoutingModule,
    SharedModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FontAwesomeModule
  ],
  exports: [
    EventsRoutingModule
  ],
  providers: [
    EventsAPIService,
    EventService,
    EventsResolverService,
    EventResolverService
  ]
})
export class EventsModule { }
