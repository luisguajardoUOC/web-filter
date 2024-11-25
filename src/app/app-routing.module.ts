import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';  // Asegúrate de importar el componente
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { HelpComponent } from './pages/help/help.component';
import { HistoryComponent } from './pages/history/history.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir siempre al login al inicio
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'filters', component: FiltersComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'help', component: HelpComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirección interna a dashboard
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Cualquier ruta no definida redirige al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
