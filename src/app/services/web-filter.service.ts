import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebFilterService {
  private baseUrl = 'http://127.0.0.1:5000/api';  // URL del backend en Flask

  constructor(private http: HttpClient) {}

    // Método para verificar si una URL está bloqueada
    checkUrl(url: string): Observable<any> { // NO SE UTILIZA
      const body = { url: url };
      return this.http.post<any>(`${this.baseUrl}/api/filter`, body);
      }
    // Servicio para obtener reglas de filtrado
    getRules(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/filter/list_rules`);
    }

    addRule(data:any): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(`${this.baseUrl}/filter/add_rule`, data, {headers});
    }

    editeRule(data: any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      // const body = { identifier: userIdentifier, rule: rule, action: action };
      return this.http.post<any>(`${this.baseUrl}/filter/edit_rule`, data, {headers});
    }

    deleteRule(data:any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/filter/delete_rule`, data);
    }

    // Servicio para agregar una nueva regla de filtrado



    // Servicio para eliminar una regla de filtrado
    deleteBlockedSite(id: string): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/filter/delete_rules`);
    }
    addAuthorizedSite(rule: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/filter/add_authorized_sites`, rule);
    }

    // palabras claves
    getKeywords(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/filter/get_keywords`);
    }

    addKeyword(data: any): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(`${this.baseUrl}/filter/add_keyword`, data, {headers});
    }

    // Servicio para obtener los usuarios
    getUsers(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/auth/get_users`);
    }

    createUser(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/auth/add_user`, user);
    }

    updateUser(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/auth/edit_user`, user);
    }

    deleteUser(id: string): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/auth/delete_user/${id}`);
    }

    changeMessage(message: string): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(`${this.baseUrl}/other/change_message`, message, {headers});
    }

    uploadCertificate(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<any>(`${this.baseUrl}/other/upload_certificate`, formData);
    }




  // Servicio para obtener el historial
  getHistory(month:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/history/history/${month}`);
  }

  // Servicio para obtener el historial de los últimos 6 meses
  getHistoryForLast6Months(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/history/history`);
  }
   // Iniciar el proxy
   startProxy(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/proxy/start_proxy`);
  }

  // Detener el proxy
  stopProxy(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/proxy/stop_proxy`);
  }

   // Obtener el estado del proxy
   getProxyStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/proxy/proxy_status`);
  }
  reoladProxy(): Observable<any>  {
    return this.http.get<any>(`${this.baseUrl}/proxy/reload_proxy`);
  }
}
