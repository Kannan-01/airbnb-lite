import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  brandlogo: string = './assets/images/airbnb.png';
  userImg: string = './assets/images/People.png';
  loggedIn: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  registerForm = this.fb.group({
    fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    dob: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

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

  login() {
    if (this.loginForm.valid) {
      const password = this.loginForm.value.password;
      const email = this.loginForm.value.email;
      const user = { email, password };
      this.api.loginAPI(user).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(`${res.existingUser.firstName} login successful !`);
          sessionStorage.setItem('firstName', res.existingUser.firstName);
          sessionStorage.setItem('token', res.token);
          this.router.navigateByUrl('/');
          this.checkLogged();
          this.loginForm.reset();
        },
        error: (err: any) => {
          alert(err.error);
        },
      });
    } else {
      alert('Invalid form');
    }
  }
  logout(){
    sessionStorage.removeItem("firstName")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("")
    this.checkLogged()
  }
  register() {
    if (this.registerForm.valid) {
      const firstName = this.registerForm.value.fname;
      const lastName = this.registerForm.value.lname;
      const dateOfBirth = this.registerForm.value.dob;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      const user = { firstName, lastName, dateOfBirth, email, password };

      this.api.registerAPI(user).subscribe({
        next: (res: any) => {
          alert(`${res.firstName} registered succesfully !`);
          this.router.navigateByUrl('/user/login');
          this.registerForm.reset();
        },
        error: (err: any) => {
          alert(err.error);
          console.log(err.error);

          this.registerForm.reset();
        },
      });
    } else {
      alert('Invalid form');
    }
  }
}
