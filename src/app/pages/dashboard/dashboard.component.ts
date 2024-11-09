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
   totalBlockedPages: number[] = [];
   totalAutorizedPages: number[] = [];
   urlHistory: any[] = [];
   urlHistoryAuthorized: any[] = [];
   urlHistoryBlocked: any[] = [];
   filteringRules: any[] = [];
   activityLogs: any[] = [];
   securityAlert: any = null;
   month: number = new Date().getMonth() + 1;

   // Variables para los gráficos
   dailyData: any;
   monthlyData: any;
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
      authorized: [], // Ejemplo de datos permitidos
      blocked: [],     // Ejemplo de datos bloqueados
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'] // Etiquetas de ejemplo
    };
    this.monthlyData = {
      authorized: [], // Ejemplo de datos permitidos
      blocked: [],     // Ejemplo de datos bloqueados
      labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4'] // Etiquetas de ejemplo
    }

  }

  // Llamadas para inicializar los datos del dashboard
  initializeDashboardData(): void {
    console.log(`Mes actual: ${this.month}`);
    this.webFilterService.getHistoryForLast6Months().subscribe(data => {
      this.processDashboardData(data, 'daily');
      this.processDashboardData(data, 'monthly');
    });
  }

  processDashboardData(data: any, period: 'daily' | 'monthly'): void {
    if (period === 'daily') {
      this.processDashboardDataByDays(data);
      this.dailyTrafficData = {
        series: [
          { name: 'Permitido', data: this.totalAutorizedPages },
          { name: 'Bloqueado', data: this.totalBlockedPages}
        ],
        labels: this.dailyData.labels
      };
    } else if (period === 'monthly') {
      this.processDashboardDataByMonths(data);

      this.monthlyTrafficData = {
        series: [
          { name: 'Permitido', data: this.totalAutorizedPages },
          { name: 'Bloqueado', data: this.totalBlockedPages}
        ],
        labels: this.monthlyData.labels
    }
    }
    // Histórico de URLs accedidas
    this.urlHistory = data.slice(0, 10);
    this.urlHistoryAuthorized = data
    .filter((entry: any) => entry.action === "autorizar").length;
    this.urlHistoryBlocked = data
    .filter((entry: any) => entry.action === "bloquear").length;

    // Logs de actividad, si los datos existen en la respuesta
    if (data.activityLogs) {
      this.activityLogs = data.activityLogs;
    } else {
      this.activityLogs = [];
    }

    // Datos para el gráfico de tráfico bloqueado vs permitido




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

  processDashboardDataByDays(data: any): void {
    const today = new Date();

    // Inicializamos los arrays para almacenar el total de páginas bloqueadas y autorizadas por día (últimos 7 días)
    this.totalBlockedPages = Array(7).fill(0);
    this.totalAutorizedPages = Array(7).fill(0);

    Array.from({ length: 7 }).forEach((_, index) => {
      // Creamos una nueva fecha en UTC para cada uno de los últimos 7 días
      const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - index));
      const dateString = date.toISOString().split('T')[0];

      // Filtramos y contamos las páginas bloqueadas para el día correspondiente
      this.totalBlockedPages[index] = data.filter((entry: any) => {
        const entryDate = new Date(entry.timestamp).toISOString().split('T')[0];
        return entry.action === 'bloquear' && entryDate === dateString;
      }).length;

      // Filtramos y contamos las páginas autorizadas para el día correspondiente
      this.totalAutorizedPages[index] = data.filter((entry: any) => {
        const entryDate = new Date(entry.timestamp).toISOString().split('T')[0];
        return entry.action === 'autorizar' && entryDate === dateString;
      }).length;


    });
  }

  processDashboardDataByMonths(data: any): void {
    const today = new Date();

    // Inicializamos los arrays para almacenar el total de páginas bloqueadas y autorizadas por mes (últimos 6 meses)
    this.totalBlockedPages = Array(6).fill(0);
    this.totalAutorizedPages = Array(6).fill(0);

    Array.from({ length: 6 }).forEach((_, index) => {
      // Creamos una nueva fecha en UTC para cada uno de los últimos 6 meses
      const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - index, 1));

      const month = date.getUTCMonth();
      const year = date.getUTCFullYear();

      // Filtramos y contamos las páginas bloqueadas para el mes correspondiente
      this.totalBlockedPages[index] = data.filter((entry: any) => {
        const entryDate = new Date(entry.timestamp);
        return (
          entry.action === 'bloquear' &&
          entryDate.getUTCMonth() === month &&
          entryDate.getUTCFullYear() === year
        );
      }).length;

      // Filtramos y contamos las páginas autorizadas para el mes correspondiente
      this.totalAutorizedPages[index] = data.filter((entry: any) => {
        const entryDate = new Date(entry.timestamp);
        return (
          entry.action === 'autorizar' &&
          entryDate.getUTCMonth() === month &&
          entryDate.getUTCFullYear() === year
        );
      }).length;
    });
  }


}
