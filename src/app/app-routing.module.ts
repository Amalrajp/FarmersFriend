import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PlantoverviewComponent } from './plantoverview/plantoverview.component';
import { MachineoverviewComponent } from './machineoverview/machineoverview.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RouteGuard } from './route.guard';
import { BusinessConfigComponent } from './business-config/business-config.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'homepage', component: HomepageComponent, children: [
      { path: 'plant', component: PlantoverviewComponent, canActivate: [RouteGuard] },
      { path: '', redirectTo: 'plant', pathMatch: 'full' },
      { path: 'b-unit/:bu', component: MachineoverviewComponent, canActivate: [RouteGuard] },
      { path: 'user-management', component: UserManagementComponent, canActivate: [RouteGuard] },
      { path: 'bu-config', component: BusinessConfigComponent, canActivate: [RouteGuard] },
    ]
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
