import { Component } from '@angular/core';
import { WebFilterService } from '../../services/web-filter.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  proxyStatus: boolean | undefined;

constructor (private webFilterService: WebFilterService) {}


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
