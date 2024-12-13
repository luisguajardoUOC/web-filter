import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-traffic-chart',
  templateUrl: './traffic-chart.component.html',
  styleUrls: ['./traffic-chart.component.css']
})
export class TrafficChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>  = {};;
  @Input()trafficData: any = { series: [], labels: [] };
  @Input() chartTitle: string = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['trafficData'] || changes['chartTitle']) && this.trafficData?.series?.length) {
      this.updateChartOptions();
    } else {
      console.warn('Datos de tráfico no válidos:', this.trafficData);
    }
  }


  updateChartOptions(): void {
    this.chartOptions = {
      series: this.trafficData.series || [],
      chart: { type: 'bar', height: 350 },
      title: { text: this.chartTitle || 'Sin título' },
      xaxis: { categories: this.trafficData.labels || [] }
    };
  }
}
