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

    // Servicio para agregar una regla de filtrado
    addRule(data:any): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(`${this.baseUrl}/filter/add_rule`, data, {headers});
    }
    // Servicio para editar una regla de filtrado
    editeRule(data: any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(`${this.baseUrl}/filter/edit_rule`, data, {headers});
    }
    // Servicio para eliminar una regla de filtrado
    deleteRule(data:any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/filter/delete_rule`, data);
    }

    // Servicio para eliminar una regla de filtrado NO SE UTILIZAN
    deleteBlockedSite(id: string): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/filter/delete_rules`);
    }
    // Servicio de gestión de  sitios autorizados
    addAuthorizedSite(rule: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/filter/add_authorized_sites`, rule);
    }

    // Servicio de gestión de  palabras claves
    getKeywords(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/filter/get_keywords`);
    }
    // Servicio de gestión de  palabras claves
    addKeyword(data: any): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(`${this.baseUrl}/filter/add_keyword`, data, {headers});
    }

    // Servicio para obtener los usuarios
    getUsers(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/auth/get_users`);
    }
    // Servicio para agregar un usuario
    createUser(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/auth/add_user`, user);
    }
    // Servicio para editar un usuario
    updateUser(user: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/auth/edit_user`, user);
    }
    // Servicio para eliminar un usuario
    deleteUser(id: string): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/auth/delete_user/${id}`);
    }

    // servicio para cambiar el mensaje
    changeMessage(message: string): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post<any>(`${this.baseUrl}/other/change_message`, message, {headers});
    }

    // servicio para subida de certificado
    uploadCertificate(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('certificate', file);
      return this.http.post<any>(`${this.baseUrl}/other/upload_certificate`, formData);
    }


    // Servicio para obtener el historial
    getHistory(month:number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/history/history/${month}`);
    }

    getHistoryForLast6Months(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/history/history`);
    }

    // Servicio de gestión de proxy
    startProxy(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/proxy/start_proxy`);
    }

    // --  Detener el proxy
    stopProxy(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/proxy/stop_proxy`);
    }

    // -- Obtener el estado del proxy
    getProxyStatus(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/proxy/proxy_status`);
    }
    // -- Recargar el proxy
    reoladProxy(): Observable<any>  {
      return this.http.get<any>(`${this.baseUrl}/proxy/reload_proxy`);
    }
}
