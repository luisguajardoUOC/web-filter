import { Component } from '@angular/core';


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
    { label: 'Logout', icon: 'logout', url: '/logout' },
  ];
}

