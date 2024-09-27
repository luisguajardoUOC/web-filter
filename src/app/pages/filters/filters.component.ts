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

  // Método para eliminar una regla de filtrado
  deleteRule(id: number): void {
    this.webFilterService.deleteRule(id).subscribe(() => {
      // Al eliminar la regla, actualizamos la lista
      this.filteringRules = this.filteringRules.filter(rule => rule.id !== id);
    });
  }
}
