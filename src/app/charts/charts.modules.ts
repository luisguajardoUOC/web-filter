// charts.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TrafficChartComponent } from './traffic-chart/traffic-chart.component';

@NgModule({
  declarations: [ TrafficChartComponent // Declara el componente del gráfico aquí
    ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ChartComponent,
    ChartComponent,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  exports: [NgApexchartsModule,
    TrafficChartComponent
  ] // Exportamos NgApexchartsModule para que esté disponible
})
export class ChartsModule { }
