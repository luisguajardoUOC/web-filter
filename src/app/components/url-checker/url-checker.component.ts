import { Component } from '@angular/core';
import { WebFilterService } from '../../services/web-filter.service';

@Component({
  selector: 'app-url-checker',
  templateUrl: './url-checker.component.html',
  styleUrls: ['./url-checker.component.css']
})
export class UrlCheckerComponent {
  url: string = '';
  result: string = '';

  constructor(private webFilterService: WebFilterService) {}

  checkUrl() {
    if (this.url) {
      this.webFilterService.checkUrl(this.url).subscribe(response => {
        this.result = response.message;
      }, error => {
        this.result = 'Error verificando la URL';
      });
    }
  }
}
