import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PlantoverviewComponent } from './plantoverview/plantoverview.component';




const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'homepage', component: HomepageComponent, children: [
      { path: 'plant', component: PlantoverviewComponent },
      { path: '', redirectTo: 'plant', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
