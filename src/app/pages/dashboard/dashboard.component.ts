import { Component, OnInit } from '@angular/core';
import { WebFilterService } from '../../services/web-filter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
   // Variables para almacenar datos del backend
   proxyStatus: boolean = false;
   totalBlockedPages: number = 0;
   urlHistory: any[] = [];
   filteringRules: any[] = [];
   activityLogs: any[] = [];
   securityAlert: any = null;

   // Variables para los gráficos
   trafficData: any;
   trafficChartOptions: any;

   constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
     // Llamadas para inicializar los datos del dashboard
     this.getProxyStatus();
     this.getTotalBlockedPages();
     this.getUrlHistory();
     this.getActivityLogs();
     this.getTrafficData();  // Para el gráfico
  }

  // Llamadas para inicializar los datos del dashboard


  getTotalBlockedPages(): void {
    this.webFilterService.getHistory().subscribe(data => {
      this.totalBlockedPages = data.totalBlockedPages;
    });
  }

  getUrlHistory(): void {
    this.webFilterService.getHistory().subscribe(data => {
      this.urlHistory = data.urlHistory;
    });
  }



  getActivityLogs(): void {
    this.webFilterService.getHistory().subscribe(data => {
      this.activityLogs = data.activityLogs;
    });
  }

  getTrafficData(): void {
    this.webFilterService.getHistory().subscribe(data => {
      const blockedCount = data.filter((entry: any) => entry.blocked).length;
      const allowedCount = data.length - blockedCount;

      this.trafficData = {
        labels: ['Permitido', 'Bloqueado'],
        datasets: [{
          label: 'Páginas',
          data: [allowedCount, blockedCount],
          backgroundColor: ['#4caf50', '#f44336']
        }]
      };
    });
  }
  // Métodos para iniciar/detener el proxy (puedes simular o implementar en backend)// Obtener el estado del proxy desde el backend
  getProxyStatus() {
    this.webFilterService.getProxyStatus().subscribe((data: any) => {
      this.proxyStatus = data.status === 'running';
    });
  }

  // Iniciar el proxy
  startProxy() {
    this.webFilterService.startProxy().subscribe(() => {
      this.proxyStatus = true;
    });
  }

  // Detener el proxy
  stopProxy() {
    this.webFilterService.stopProxy().subscribe(() => {
      this.proxyStatus = false;
    });
  }



}
