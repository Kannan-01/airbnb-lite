import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) {}
  loggedIn: boolean = false;
  currentlyHosting: boolean = false;
  reserved:boolean=false;
  brandlogo: string = './assets/images/airbnb.png';
  userImg: string = './assets/images/People.png';
  ngOnInit(): void {
    this.checkLogged();
    this.checkHostings();
    this.checkReservations();
  }

  checkLogged() {
    if (sessionStorage.getItem('token')) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
  logout() {
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('');
    this.checkLogged();
  }

  checkHostings() {
    this.api.getHostings().subscribe({
      next: (res: any) => {
        const hosted = res;
        if (hosted.length > 0) {
          this.currentlyHosting = true;
        }
      },
      error(err: any) {
        console.log(err.error);
      },
    });
  }

  checkReservations() {
    this.api.getReservations().subscribe({
      next: (res: any) => {
        const hosted = res;
        if (hosted.length > 0) {
          this.reserved = true;
        }
      },
      error(err: any) {
        console.log(err.error);
      },
    });
  }
}
