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
import { EventAddButtonComponent } from './event-add-button/event-add-button.component';
import { EventsAPIService } from './events-api.service';
import { EventService } from './events.service';
import { EventsResolverService } from './events-resolver.service';
import { EventResolverService } from './event-resolver.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventsFiltersComponent } from './events-filters/events-filters.component';
import { EventFilterComponent } from './events-filters/event-filter/event-filter.component';
import { EventsFiltersService } from './events-filters/events-filters.service';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventDetailComponent,
    EventStartComponent,
    EventEditComponent,
    EventAddButtonComponent,
    EventsFiltersComponent,
    EventFilterComponent
  ],
  imports: [
    ReactiveFormsModule,
    FullCalendarModule,
    EventsRoutingModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    EventsRoutingModule
  ],
  providers: [
    EventsFiltersService,
    EventsAPIService,
    EventService,
    EventsResolverService,
    EventResolverService
  ]
})
export class EventsModule { }
