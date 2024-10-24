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
  historyData: Hisotry[] = [
    { id: '1', url: 'https://example.com', stateUrl: 'bloqueada', type: 'social', userIP: '192.168.1.1', role: 'student', date: '2024-10-01' },
    { id: '2', url: 'https://educacion.com', stateUrl: 'accedida', type: 'educacion', userIP: '192.168.1.2', role: 'teacher', date: '2024-10-01' },
    { id: '3', url: 'https://socialmedia.com', stateUrl: 'bloqueada', type: 'entretenimiento', userIP: '192.168.1.3', role: 'public', date: '2024-10-01' },
    { id: '3', url: 'https://socialmedia.com', stateUrl: 'bloqueada', type: 'entretenimiento', userIP: '192.168.1.4', role: 'public', date: '2024-10-01' }
  ];
  // Definir las columnas a mostrar en la tabla
  displayedColumns: string[] = ['id', 'url', 'stateUrl', 'type', 'userIP', 'role', 'date'];
  constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
    this.getHisotryUsers();
    // this.postFilteringRules(arg: any);
  }

  getHisotryUsers(): void {
    this.webFilterService.getHistory().subscribe(data => {
      console.log(data);
      this.historyData = data;
    });
  }
  filteredHistoryData = new MatTableDataSource(this.historyData);
  applyFilter(event: Event, type: string) {
    console.log("event",event);
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue",filterValue);

    //this.historyData = this.historyData.filter((item: any) => item.userIP.includes(filterValue));
    this.historyData = this.historyData.filter((item: any) => {
      const a = item.userIP.includes(filterValue)
      const b =item.role.includes(filterValue)
      return  a || b
      //item.role.inclues(filterValue)
    });
    console.log("this.historyData",this.historyData);
  }
}
