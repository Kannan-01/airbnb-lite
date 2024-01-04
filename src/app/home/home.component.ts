import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  brandlogo: string = './assets/images/airbnb.png';
  userImg: string = './assets/images/People.png';
  loggedIn: boolean = this.auth.isLogged();
  domainPic = sessionStorage.getItem('domainpic');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  registerForm = this.fb.group({
    fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    dob: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toaster: ToasterService,
    private auth: AuthService
  ) {}

  login() {
    document.getElementById('loginModalClose')?.click();

    if (this.loginForm.valid) {
      const password = this.loginForm.value.password;
      const email = this.loginForm.value.email;
      const user = { email, password };
      this.api.loginAPI(user).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('domainpic', res.existingUser.userImage);
          sessionStorage.setItem('token', res.token);
          this.toaster.showSuccess(`Login successful`);
          location.reload();
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
    sessionStorage.removeItem('domainpic');
    sessionStorage.removeItem('hosting');
    sessionStorage.removeItem('reserved');
    this.router.navigateByUrl('');
    location.reload();
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
          this.registerForm.reset();
          document.getElementById('loginModalOpen')?.click();
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
