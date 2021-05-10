import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MachineoverviewComponent } from './machineoverview/machineoverview.component';
import { PlantoverviewComponent } from './plantoverview/plantoverview.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxGaugeModule } from 'ngx-gauge';
import { UserManagementComponent, UserEditDialog, UserAddDialog } from './user-management/user-management.component';
import { BusinessConfigComponent, BUAddDialog, BUEditDialog } from './business-config/business-config.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    MachineoverviewComponent,
    PlantoverviewComponent,   
    UserManagementComponent,
    BusinessConfigComponent,
    UserEditDialog,
    UserAddDialog,
    BUAddDialog,
    BUEditDialog,
 
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    NgxGaugeModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    UserEditDialog,
    UserAddDialog,
    BUAddDialog,
    BUEditDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
