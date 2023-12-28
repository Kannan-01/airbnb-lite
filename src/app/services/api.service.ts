import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  loginAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/login`, user);
  }
}
