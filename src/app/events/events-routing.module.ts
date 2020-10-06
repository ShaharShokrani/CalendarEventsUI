import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { EventStartComponent } from './event-start/event-start.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsResolverService } from './events-resolver.service';
import { AuthGuard } from '../auth/auth.guard';
import { EventResolverService } from './event-resolver.service';

const children = [
    { path: '', component: EventStartComponent },
    { path: 'new', component: EventEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: EventDetailComponent, resolve: {eventResolverService : EventResolverService} },
    { path: ':id/edit', component: EventEditComponent, canActivate: [AuthGuard], resolve: {eventResolverService : EventResolverService} }
];

const routes: Routes = [  
  { path: '', component: EventsComponent, children: children, resolve: {eventsResolverService : EventsResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}