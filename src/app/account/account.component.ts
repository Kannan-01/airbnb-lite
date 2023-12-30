import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  account: any = {};
  image: any = '';
  loading: boolean = false;

  updateForm = this.fb.group({
    fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cpassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    emergency: ['', [Validators.pattern('[0-9]*')]],
    address: ['', [Validators.pattern('[a-zA-Z0-9]*')]],
  });

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.accountDetails();
  }

  accountDetails() {
    this.loading = true;
    this.api.accountDetails().subscribe({
      next: (res: any) => {
        this.account = res;
        this.loading = false;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  updateEmail() {
    if (this.updateForm.get('email')?.valid) {
      document.getElementById('ModalClose')?.click();
      const email = this.updateForm.value.email;
      const update = { email };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          alert('Email updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          alert(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      alert('Form invalid');
    }
  }

  updatePhone() {
    if (this.updateForm.get('phone')?.valid) {
      document.getElementById('phoneModalClose')?.click();
      const phoneNumber = this.updateForm.value.phone;
      const update = { phoneNumber };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          alert('Phone updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          alert(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      alert('Form invalid');
    }
  }

  // get file
  getFile(event: any) {
    let file = event.target.files[0];
    // console.log(file);
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.image = event.target.result;
      this.updateImage();
    };
  }

  updateImage() {
    if (this.image) {
      // this.loading = true;
      const userImage = this.image;
      const update = { userImage };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          alert('Profile image updated!');
          // this.loading = false;
          this.accountDetails();
        },
        error: (err: any) => {
          alert(err.error);
        },
      });
    } else {
      alert('Form invalid');
    }
  }

  updateEmergency() {
    if (this.updateForm.get('emergency')?.valid) {
      document.getElementById('emergencyModalClose')?.click();
      const emergencyNumber = this.updateForm.value.emergency;
      const update = { emergencyNumber };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          alert('Emergency Number updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          alert(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      alert('Form invalid');
    }
  }

  updateAddress() {
    if (this.updateForm.get('address')?.valid) {
      document.getElementById('addressModalClose')?.click();
      const address = this.updateForm.value.address;
      const update = { address };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          alert('Address updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          alert(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      alert('Form invalid');
    }
  }

  updatePassword() {
    if (
      this.updateForm.get('password')?.valid &&
      this.updateForm.get('cpassword')?.valid
    ) {
      const password = this.updateForm.value.password;
      const cpassword=this.updateForm.value.cpassword;
      if(password==cpassword){
        document.getElementById('passwordModalClose')?.click();
        const update = { password };
        this.api.updateAccount(update).subscribe({
          next: (res: any) => {
            alert('password updated !');
            this.updateForm.reset();
          },
          error: (err: any) => {
            alert(err.error);
            this.updateForm.reset();
          },
        });
      }
      else{
        alert("password do not match")
      }
    } else {
      alert('form invalid !');
    }
  }

  updateName() {
    if (this.updateForm.get('fname')?.valid) {
      document.getElementById('nameModalClose')?.click();
      const firstName = this.updateForm.value.fname;
      const update = { firstName };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          alert('Name updated !');
          this.accountDetails();
        },
        error: (err: any) => {
          alert(err.error);
          this.updateForm.reset();
        },
      });
    } else if (this.updateForm.get('lname')?.valid) {
      document.getElementById('nameModalClose')?.click();
      const lastName = this.updateForm.value.lname;
      const update = { lastName };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          alert('Name updated !');
          this.accountDetails();
        },
        error: (err: any) => {
          alert(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      document.getElementById('nameModalClose')?.click();
      const firstName = this.updateForm.value.fname;
      const lastName = this.updateForm.value.lname;
      const update = { firstName, lastName };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          alert('Name updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          alert(err.error);
          this.updateForm.reset();
        },
      });
    }
  }
}
