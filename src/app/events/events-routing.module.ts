import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { AuthGuard } from '../auth/auth.guard';
import { EventStartComponent } from './event-start/event-start.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsResolverService } from './events-resolver.service';

const children = [
    { path: '', component: EventStartComponent },
    { path: 'new', component: EventEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: EventDetailComponent, resolve: [EventsResolverService] },
    { path: ':id/edit', component: EventEditComponent, resolve: [EventsResolverService], canActivate: [AuthGuard] }
];

const routes: Routes = [  
  { path: 'events', component: EventsComponent, children: children},
  { path: 'events/:year/:month/:day', component: EventsComponent, children: children}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}