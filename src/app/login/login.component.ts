import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}
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
}
