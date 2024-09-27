import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebFilterService {
  private baseUrl = 'http://127.0.0.1:5000';  // URL del backend en Flask

  constructor(private http: HttpClient) {}

  // Método para verificar si una URL está bloqueada
  checkUrl(url: string): Observable<any> {
    const body = { url: url };
    return this.http.post<any>(`${this.baseUrl}/check-url`, body);
  }
}
