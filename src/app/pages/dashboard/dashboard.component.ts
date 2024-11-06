import { Component, OnInit } from '@angular/core';
import { WebFilterService } from '../../services/web-filter.service';
import ApexCharts from 'apexcharts'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
   // Variables para almacenar datos del backend
   proxyStatus: boolean = false;
   totalBlockedPages: number = 0;
   totalAutorizedPages: number = 0;
   urlHistory: any[] = [];
   filteringRules: any[] = [];
   activityLogs: any[] = [];
   securityAlert: any = null;

   // Variables para los gráficos
   dailyData: any;
   trafficData1: any;
   trafficChartOptions: any;
   dailyTrafficData: any;
   monthlyTrafficData: any;
   hourlyTrafficData: any;

   constructor(private webFilterService: WebFilterService) {}
  ngOnInit(): void {
     // Llamadas para inicializar los datos del dashboard
     this.getProxyStatus();
     this.initializeDashboardData();
     this.dailyData = {
      authorized: [10, 20, 30, 40], // Ejemplo de datos permitidos
      blocked: [5, 15, 25, 35],     // Ejemplo de datos bloqueados
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'] // Etiquetas de ejemplo
    };
    // this.getTotalBlockedPages();
    // this.getUrlHistory();
   //  this.getActivityLogs();
    // this.getTrafficData();  // Para el gráfico
  }

  // Llamadas para inicializar los datos del dashboard
  initializeDashboardData(): void {
    this.webFilterService.getHistory().subscribe(data => {
      this.processDashboardData(data);
    });
  }

  processDashboardData(data: any): void {
    // Total de páginas bloqueadas
    this.totalBlockedPages = data.filter((entry: any) => entry.action === 'bloquear').length;
    this.totalAutorizedPages = data.filter((entry: any) => entry.action === 'autorizar').length;

    // Histórico de URLs accedidas
    this.urlHistory = data
    .filter((entry: any) => entry.action === "autorizar")
    .map((entry: any) => ({
      ...entry,
      timestamp: entry.timestamp.replace(" GMT", "")
    }));

    // Logs de actividad, si los datos existen en la respuesta
    if (data.activityLogs) {
      this.activityLogs = data.activityLogs;
    } else {
      this.activityLogs = [];
    }

    // Datos para el gráfico de tráfico bloqueado vs permitido
    const blockedCount = this.totalBlockedPages;
    const allowedCount = this.totalAutorizedPages;


    this.dailyTrafficData = {
      series: [
        { name: 'Permitido', data: this.dailyData.authorized },
        { name: 'Bloqueado', data: this.dailyData.blocked }
      ],
      labels: this.dailyData.labels
    };
    console.log("dailyTrafficData:", this.dailyTrafficData);
  }

/*  getTotalBlockedPages(): void {
    this.webFilterService.getHistory().subscribe(data => {
      this.totalBlockedPages = data.totalBlockedPages;
    });
  }

  getUrlHistory(): void {
    this.webFilterService.getHistory().subscribe(data => {
      console.log(data);
      this.urlHistory = data.map((item: any) => ({
        ...item,
        timestamp: item.timestamp.replace(" GMT", "")
      }));
  }
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
  }*/
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
