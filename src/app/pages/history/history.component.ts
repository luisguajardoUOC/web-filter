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

  // Definir las columnas a mostrar en la tabla
  displayedColumns: string[] = [ 'url', 'action',  'userIP', 'role', 'date'];
  constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
    this.getHisotryUsers();
    // this.postFilteringRules(arg: any);
  }

  getHisotryUsers(): void {
    this.webFilterService.getHistory().subscribe(data => {
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
    //console.log("filterValue",filterValue);
    if (filterValue === '') {
      this.FilterhistoryData = [...this.historyData];
    } else {
      //this.historyData = this.historyData.filter((item: any) => item.userIP.includes(filterValue));
        this.FilterhistoryData = this.historyData.filter((item: any) => {
        const a = item.userIP.includes(filterValue)
        const b = item.user_rol.includes(filterValue)
        const c = item.url.includes(filterValue)
        return  a || b || c
        //item.role.inclues(filterValue)
      });
      console.log("this.historyData",this.FilterhistoryData);
    }
  }
}
