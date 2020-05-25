import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventStartComponent } from './events/event-start/event-start.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { AboutComponent } from './about/about.component';
import { EventsResolverService } from './events/events-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const eventChildren = [
    { path: '', component: EventStartComponent },
    { path: 'new', component: EventEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: EventDetailComponent, resolve: [EventsResolverService] },
    { path: ':id/edit', component: EventEditComponent, resolve: [EventsResolverService], canActivate: [AuthGuard] }
];

const appRoutes : Routes = [
    { path: '', redirectTo: '/events' , pathMatch: 'full'},
    { path: 'events', component: EventsComponent, children: eventChildren},
    { path: 'events/:year/:month/:day', component: EventsComponent, children: eventChildren},
    { path: 'about', component: AboutComponent, pathMatch: 'prefix'},
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}