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
    return this.http.post<any>(`${this.baseUrl}/api/filter`, body);
  }
  // Servicio para obtener reglas de filtrado
  getRules(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/rules`);
  }
  // Servicio para agregar una nueva regla de filtrado
  addRule(rule: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/rules`, rule);
  }
  // Servicio para eliminar una regla de filtrado
  deleteRule(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/rules/${id}`);
  }
  // Servicio para obtener el historial
  getHistory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/history`);
  }
}
