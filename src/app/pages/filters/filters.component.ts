import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebFilterService } from '../../services/web-filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent  implements OnInit {

  filteringRules: any[] = [];
  displayedColumns: string[] = ['url', 'type', 'action'];  // Definimos las columnas a mostrar en la tabla
  newRule: {
    action: string;
    url: string;
    type: string;
  } = {
    action: 'bloquear',  // Valor por defecto
    url: '',             // Inicialmente vacío
    type: 'a'            // Valor por defecto
  };

  constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
    this.getFilteringRules();
    // this.postFilteringRules(arg: any);
  }


  getFilteringRules(): void {
    this.webFilterService.getRules().subscribe(data => {
      this.filteringRules = data.filteringRules;
    });
  }

  postFilteringRules(arg: any): void {
    this.webFilterService.addRule(arg).subscribe(data => {
      this.filteringRules = data.filteringRules;
    });
  }
  // Método para agregar una nueva regla
  addRule(): void {
    // Validar que la URL no esté vacía
    if (!this.newRule.url) {
      return;
    }
      // Llamamos al servicio para agregar la regla
    this.webFilterService.addRule(this.newRule).subscribe(data => {
      this.filteringRules = data;  // Actualizamos la lista de reglas
      this.clearForm();  // Limpiar el formulario después de agregar
    });
  }

  // Método para eliminar una regla de filtrado
  deleteRule(id: number): void {
    this.webFilterService.deleteRule(id).subscribe(() => {
      // Al eliminar la regla, actualizamos la lista
      this.filteringRules = this.filteringRules.filter(rule => rule.id !== id);
    });
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
