import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes : Routes = [
    { path: '', redirectTo: '/events' , pathMatch: 'full'},
    { path: 'about', component: AboutComponent, pathMatch: 'prefix'},
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}