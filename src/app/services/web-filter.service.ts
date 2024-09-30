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
    addBlockedSite(rule: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/add_blocked_site`, rule);
    }
    // Servicio para eliminar una regla de filtrado
    deleteBlockedSite(id: string): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/api/rules/${id}`);
    }
    addAuthorizedSite(url: string): Observable<any> {
      const body = { url: url };
      return this.http.post<any>(`${this.baseUrl}/add_authorized_sites`, body);
    }

    addRuleForUser(userIdentifier: string, rule: string, action: string) {
      const body = { identifier: userIdentifier, rule: rule, action: action };
      return this.http.post<any>(`${this.baseUrl}/api/add-rule`, body);
    }

  // Servicio para obtener el historial
  getHistory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/history`);
  }
   // Iniciar el proxy
   startProxy(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/start_proxy`, {});
  }

  // Detener el proxy
  stopProxy(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/stop_proxy`, {});
  }

   // Obtener el estado del proxy
   getProxyStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/proxy_status`);
  }

}
