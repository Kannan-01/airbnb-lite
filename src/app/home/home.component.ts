import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
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
    private router: Router,
    private toaster: ToasterService
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
    document.getElementById('loginModalClose')?.click();
    if (this.loginForm.valid) {
      const password = this.loginForm.value.password;
      const email = this.loginForm.value.email;
      const user = { email, password };
      this.api.loginAPI(user).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toaster.showSuccess(
            `${res.existingUser.firstName} login successful !`
          );
          sessionStorage.setItem('token', res.token);
          this.router.navigateByUrl('/');
          this.checkLogged();
          this.loginForm.reset();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
        },
      });
    } else {
      this.toaster.showWarning('Invalid form');
    }
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('');
    this.checkLogged();
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
          document.getElementById('registerModalClose')?.click();
          this.toaster.showSuccess(`${res.firstName} registered succesfully !`);
          this.router.navigateByUrl('/user/login');
          this.registerForm.reset();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          console.log(err.error);

          this.registerForm.reset();
        },
      });
    } else {
      this.toaster.showWarning('Invalid form');
    }
  }
}
