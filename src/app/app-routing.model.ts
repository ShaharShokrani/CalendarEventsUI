import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountModule } from './account/account.module';
import { AccountComponent } from './account/account.component';

const appRoutes : Routes = [
    { path: '', redirectTo: '/events' , pathMatch: 'full'},
    {
        path: "events",
        loadChildren: () =>
          import("./events/events.module").then(m => m.EventsModule)
    },
    {
        path: "auth-callback",
        loadChildren: () =>
        import("./auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: "account",
        component: AccountComponent
    },
    {
        path: "about",
        pathMatch: 'prefix',
        component: AboutComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}