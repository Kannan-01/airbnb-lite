import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private api: ApiService) {}
  loggedIn: boolean = false;
  domainPic = sessionStorage.getItem('domainpic');
  brandlogo: string = './assets/images/airbnb.png';
  userImg: string = './assets/images/People.png';

  logout() {
    sessionStorage.removeItem('domainpic');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
