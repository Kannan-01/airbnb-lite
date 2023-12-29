import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private router:Router){}
  loggedIn:boolean=false;
  brandlogo: string = './assets/images/airbnb.png';
  userImg: string = './assets/images/People.png';
  ngOnInit(): void {
    this.checkLogged();
  }

  checkLogged() {
    if (sessionStorage.getItem('token')) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
  logout(){
    sessionStorage.removeItem("firstName")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("")
    this.checkLogged()
  }
  }
