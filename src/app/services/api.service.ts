import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL = 'https://property-server-090y.onrender.com';
  constructor(private http: HttpClient) {}

  loginAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/login`, user);
  }
  registerAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/register`, user);
  }

  appendTokenToHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  hostAPI(property: any) {
    return this.http.post(
      `${this.SERVER_URL}/host`,
      property,
      this.appendTokenToHeader()
    );
  }
  propertiesAPI() {
    return this.http.get(`${this.SERVER_URL}/properties`);
  }

  viewPropertyAPI(id: any) {
    return this.http.get(`${this.SERVER_URL}/view/${id}`);
  }

  addToWishlistAPI(property: any) {
    return this.http.post(
      `${this.SERVER_URL}/wishlist`,
      property,
      this.appendTokenToHeader()
    );
  }
  getWishlistAPI() {
    return this.http.get(
      `${this.SERVER_URL}/wishlist/get/`,
      this.appendTokenToHeader()
    );
  }
  
  deleteWishlistItem(id: any) {
    return this.http.delete(
      `${this.SERVER_URL}/wishlist/delete/${id}`,
      this.appendTokenToHeader()
    );
  }
}
