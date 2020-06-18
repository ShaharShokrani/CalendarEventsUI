import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

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
        path: "signup",
        loadChildren: () =>
        import("./signup/signup.component").then(m => m.SignupComponent)
    },
    {
        path: "about",
        pathMatch: 'prefix',
        loadChildren: () =>
        import("./about/about.component").then(m => m.AboutComponent)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}