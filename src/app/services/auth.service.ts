import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLogged(){
    return !!sessionStorage.getItem("firstName")
   }
}
