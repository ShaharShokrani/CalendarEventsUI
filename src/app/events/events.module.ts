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

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventDetailComponent,    
    EventStartComponent,
    EventEditComponent
  ],
  imports: [
    ReactiveFormsModule, 
    FullCalendarModule,    
    EventsRoutingModule,
    SharedModule
  ],
  exports: [
    EventsRoutingModule
  ]
})
export class EventsModule {}
