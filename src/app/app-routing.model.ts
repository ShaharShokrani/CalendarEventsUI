import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthCallbackComponent } from './auth/auth-callback.component';

const appRoutes : Routes = [
    { path: '', redirectTo: '/events' , pathMatch: 'full'},    
    {
        path: "events",
        loadChildren: () =>
          import("./events/events.module").then(m => m.EventsModule)
    },
    {//TODO: Ask about why when un-commenting this code it won't work perform a StackBlitz.
        path: "auth-callback",
        loadChildren: () =>
          import("./auth/auth.module").then(m => m.AuthModule)
    },
    //{ path: 'auth-callback', component: AuthCallbackComponent, pathMatch: 'prefix'},
    { path: 'about', component: AboutComponent, pathMatch: 'prefix'}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}