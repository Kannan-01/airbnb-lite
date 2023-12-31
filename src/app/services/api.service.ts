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

  // wishlist API's
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

  // Account API's
  accountDetails() {
    return this.http.get(
      `${this.SERVER_URL}/account`,
      this.appendTokenToHeader()
    );
  }

  updateAccount(update: any) {
    return this.http.put(
      `${this.SERVER_URL}/update`,
      update,
      this.appendTokenToHeader()
    );
  }

  hostDetails(userid: any) {
    return this.http.get(`${this.SERVER_URL}/host/view/${userid}`);
  }

  viewPaymentAPI(id: any) {
    return this.http.get(`${this.SERVER_URL}/payment/${id}`);
  }

  // hostings api's
  getHostings() {
    return this.http.get(
      `${this.SERVER_URL}/hostings`,
      this.appendTokenToHeader()
    );
  }

  deleteHostings(propertyId: any) {
    return this.http.delete(`${this.SERVER_URL}/deleteProperty/${propertyId}`);
  }

  // reservation api's

  reserveAPI(reserve: any) {
    return this.http.post(
      `${this.SERVER_URL}/reserve`,
      reserve,
      this.appendTokenToHeader()
    );
  }

  getReservations() {
    return this.http.get(
      `${this.SERVER_URL}/reservations`,
      this.appendTokenToHeader()
    );
  }
}
