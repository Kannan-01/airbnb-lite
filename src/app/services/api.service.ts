import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  appendTokenToHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }
  loginAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/login`, user);
  }
  registerAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/register`, user);
  }
  hostAPI(property: any) {
    return this.http.post(`${this.SERVER_URL}/host`,property,this.appendTokenToHeader());
  }
  propertiesAPI() {
    return this.http.get(`${this.SERVER_URL}/properties`);
  }
}
