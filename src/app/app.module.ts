import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlCheckerComponent } from './components/url-checker/url-checker.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MaterialModule } from './material/material.modules';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { HistoryComponent } from './pages/history/history.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HelpComponent } from './pages/help/help.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { UsersComponent } from './pages/users/users.component';



@NgModule({
  declarations: [
    AppComponent,
    UrlCheckerComponent,
    LayoutComponent,
    DashboardComponent,
    FiltersComponent,
    HistoryComponent,
    SettingsComponent,
    HelpComponent,
    LogoutComponent,
    UsersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
