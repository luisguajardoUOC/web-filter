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
      return this.http.get<any>(`${this.baseUrl}/list_rules`);
    }

    addRule(data:any): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(`${this.baseUrl}/add_rule`, data, {headers});
    }

    editeRule(data: any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      // const body = { identifier: userIdentifier, rule: rule, action: action };
      return this.http.post<any>(`${this.baseUrl}/edit_rule`, data, {headers});
    }

    deleteRule(data:any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/delete_rule`, data);
    }

    // Servicio para agregar una nueva regla de filtrado



    // Servicio para eliminar una regla de filtrado
    deleteBlockedSite(id: string): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/delete_rules`);
    }
    addAuthorizedSite(rule: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/add_authorized_sites`, rule);
    }

    // Servicio para obtener los usuarios
    getUsers(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/get_users`);
    }

    createUser(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/add_user`, user);
    }

    updateUser(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/edit_user`, user);
    }

    deleteUser(id: string): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/delete-user/${id}`);
    }

    changeMessage(message: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/change_message`, message);
    }

    uploadCertificate(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<any>(`${this.baseUrl}/upload_certificate`, formData);
    }




  // Servicio para obtener el historial
  getHistory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/history`);
  }
   // Iniciar el proxy
   startProxy(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/start_proxy`);
  }

  // Detener el proxy
  stopProxy(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stop_proxy`);
  }

   // Obtener el estado del proxy
   getProxyStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/proxy_status`);
  }
  reoladProxy(): Observable<any>  {
    return this.http.get<any>(`${this.baseUrl}/reload_proxy`);
  }
}
