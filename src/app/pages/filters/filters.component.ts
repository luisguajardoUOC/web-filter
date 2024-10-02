import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebFilterService } from '../../services/web-filter.service';
import { FilteringRule } from '../../interfaces/filteringRules';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent  implements OnInit {

  public filteringRules: FilteringRule[] = [];
  userIPs: string[] = ['192.168.0.1', '192.168.0.2', '192.168.0.3'];  // Lista para almacenar las IPs únicas
  displayedColumns: string[] = ['url', 'type', 'action', 'userIP', 'role', 'actionBtn']; // Definimos las columnas a mostrar en la tabla
  newRule: {
    action: string;
    url: string;
    type: string;
    reason?: string;
    userIP?: string;
    role?: string;
  } = {
    action: 'bloquear',  // Valor por defecto
    url: 'any',             // Inicialmente vacío
    type: 'no category',            // Valor por defecto
    reason: 'no reason',
    userIP: 'any',
    role: 'any'
  };
  isUserIPSelected: boolean = false;
  currentRule = { id: null, url: '', type: '', action: '', userIP: 'any', role: '' }; // Inicializamos una regla vacía
  isEditing = false; // Para saber si estamos editando o agregando una nueva regla


  constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
    this.getFilteringRules();
    // this.postFilteringRules(arg: any);
  }


  getFilteringRules(): void {
    this.webFilterService.getRules().subscribe(data => {
      this.filteringRules = data.filteringRules;
        // Filtrar las IPs que no son undefined y eliminar duplicados
      this.userIPs = [...new Set(this.filteringRules
        .map(rule => rule.userIP)
        .filter((ip): ip is string => ip !== undefined))];  // Elimina undefined y asegura que sólo quedan strings
    });
  }

  // Método para agregar una nueva regla
  addRule(): void {
    // Validar que la URL no esté vacía
    if (!this.newRule.url) {
      return;
    }
     // Si estamos en modo edición (la regla tiene un id), actualizamos la regla
     if (this.isEditing) {
      // Llamar al servicio para actualizar la regla
      const newData = JSON.stringify(this.newRule);
      this.webFilterService.editeRule(newData).subscribe(data => {
        this.filteringRules = data;  // Actualizamos la lista de reglas con los datos devueltos
        this.clearForm();  // Limpiamos el formulario después de editar
      });
    } else {
      // Modo de agregar nueva regla
    if (this.newRule.action === 'autorizar') {
      const newData = JSON.stringify(this.newRule);
      this.webFilterService.addAuthorizedSite(newData).subscribe(data => {
        this.filteringRules = data;  // Actualizamos la lista de reglas
        this.clearForm();  // Limpiar el formulario aquí de agregar
      });
    } else {
      const newData = JSON.stringify(this.newRule);
      this.webFilterService.addBlockedSite(newData).subscribe(data => {
        this.filteringRules = data;  // Actualizamos la lista de reglas
        this.clearForm();  // Limpiar el formulario aquí de agregar
      });
    }
  }
  }
  // Método para eliminar una regla de filtrado
  deleteRule(id: string): void {
    this.webFilterService.deleteBlockedSite(id).subscribe(() => {
      // Al eliminar la regla, actualizamos la lista
      this.filteringRules = this.filteringRules.filter(rule => rule.id !== id);
    });
  }

   // Método para editar una regla
   editRule(rule: any) {
    this.currentRule = { ...rule }; // Copiamos la regla seleccionada al formulario
    this.isEditing = true; // Cambiamos a modo edición
  }
   // Método que se ejecuta al cambiar la selección de la IP
   onUserIPSelectionChange(event: any) {
    // Si la IP seleccionada no es 'any', se deshabilita la selección de rol
    this.isUserIPSelected = event.value !== 'any';
    this.newRule.role = '';
  }
  // Limpiar el formulario
  clearForm(): void {
    this.newRule = {
      action: 'bloquear',  // Valor por defecto
      url: '',             // Inicialmente vacío
      type: 'a'            // Valor por defecto
    };
  }
}
