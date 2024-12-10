import { Component } from '@angular/core';
import { WebFilterService } from '../../services/web-filter.service';
import { Hisotry } from '../../interfaces/filteringRules';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  // hystoriData: Hisotry[] = [];
  // Datos de ejemplo
  historyData: Hisotry[] = [];
  FilterhistoryData: Hisotry[] = [];
  month: number = new Date().getMonth() + 1;
  monthFilter: any = '';
  monthFilteredData: any;
  months: string[] = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  // Definir las columnas a mostrar en la tabla
  displayedColumns: string[] = [ 'url', 'action',  'userIP', 'role', 'date'];
  constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
    console.log(`Mes actual: ${this.month}`);
    this.getHisotryUsers();
  }

  getHisotryUsers(): void {
    this.webFilterService.getHistoryForLast6Months().subscribe(data => {
      console.log(data);
      this.historyData = data.map((item: any) => ({
        ...item,
        timestamp: item.timestamp.replace(" GMT", "")
      }));
      this.FilterhistoryData = [...this.historyData];
    });
  }
  filteredHistoryData = new MatTableDataSource(this.historyData);
  applyFilter(event: Event, type: string) {
    //console.log("event",event);
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (filterValue === '') {
      this.FilterhistoryData = [...this.historyData];
    } else {
        this.FilterhistoryData = this.historyData.filter((item: any) => {
        const a = item.userIP.includes(filterValue)
        const b = item.user_rol.includes(filterValue)
        const c = item.url.includes(filterValue)
        return  a || b || c

      });
      console.log("this.historyData",this.FilterhistoryData);
    }
    }

    applyMonthFilter() {
        // Asignar el nombre del mes según monthFilter
      if (this.monthFilter >= 1 && this.monthFilter <= 12) {
        this.monthFilteredData = this.months[this.monthFilter - 1];  // Convertir el número a nombre del mes

        this.webFilterService.getHistory(this.monthFilter).subscribe(data => {
          console.log(data);
          this.historyData = data.map((item: any) => ({
            ...item,
            timestamp: item.timestamp.replace(" GMT", "")
          }));
          this.FilterhistoryData = [...this.historyData];
        });
      } else {
        this.monthFilteredData = '';  // Si el mes es inválido, dejar en blanco
        this.getHisotryUsers();
      }
    }
}


