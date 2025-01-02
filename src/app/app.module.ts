import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MaterialModule } from './material/material.modules';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { HistoryComponent } from './pages/history/history.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HelpComponent } from './pages/help/help.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { UsersComponent } from './pages/users/users.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChartsModule } from './charts/charts.modules';
import { LoginComponent} from './pages/login/login.component';



@NgModule({
  declarations: [
    AppComponent,    
    LayoutComponent,
    DashboardComponent,
    FiltersComponent,
    HistoryComponent,
    SettingsComponent,
    HelpComponent,
    LogoutComponent,
    UsersComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
