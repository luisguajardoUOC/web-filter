import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  public sidebarItems = [
    { label: 'Dashboard', icon: 'dashboard', url: './dashboard' },
    { label: 'Reglas de Filtrado', icon: 'rule', url: './filters' },
    { label: 'Historial', icon: 'history', url: './history' },
    { label: 'Configuracion Sistema', icon: 'settings', url: '/settings' },
    { label: 'Usuarios', icon: 'people', url: '/users' },
    { label: 'Ayuda', icon: 'help', url: '/help' },
    { label: 'Logout', icon: 'logout', action: 'logout' },
  ];

  constructor(private router: Router) {}


  onMenuClick(item: any) {
    console.log("item",item);
    if (item.action === 'logout') {
      this.logout();
    } else {
      this.router.navigate([item.url]);
    }
  }
  logout() {
    // Aquí puedes limpiar datos de sesión si es necesario
    console.log('Logging out...');
    this.router.navigate(['/login'] , { replaceUrl: true }); // Redirigir al login
  }
}

