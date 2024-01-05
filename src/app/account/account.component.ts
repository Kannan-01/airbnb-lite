import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  account: any = {};
  image: any = '';
  proof: any = '';
  loading: any = false;
  updateForm = this.fb.group({
    fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cpassword: ['', [Validators.required]],
    oldpassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    emergency: ['', [Validators.pattern('[0-9]*')]],
    address: ['', [Validators.pattern('[a-zA-Z0-9]*')]],
  });

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.accountDetails();
  }

  accountDetails() {
    this.api.accountDetails().subscribe((res: any) => {
      this.account = res;
    });
  }

  updateEmail() {
    if (this.updateForm.get('email')?.valid) {
      document.getElementById('ModalClose')?.click();
      const email = this.updateForm.value.email;
      const update = { email };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess('Email updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      this.toaster.showWarning('Form invalid');
    }
  }

  updatePhone() {
    if (this.updateForm.get('phone')?.valid) {
      document.getElementById('phoneModalClose')?.click();
      const phoneNumber = this.updateForm.value.phone;
      const update = { phoneNumber };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess('Phone updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      this.toaster.showWarning('Form invalid');
    }
  }

  // get file
  getFile(event: any) {
    this.loading = true;
    let file = event.target.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.image = event.target.result;
      this.updateImage();
    };
  }
  // get proof
  getProof(event: any) {
    let file = event.target.files[0];
    // console.log(file);
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.proof = event.target.result;
    };
  }

  updateProof() {
    if (this.proof) {
      const idProof = this.proof;
      const update = { idProof };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess('Govt Id Uploaded!');
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
        },
      });
    } else {
      this.toaster.showWarning('Form invalid');
    }
  }

  updateImage() {
    if (this.image) {
      // this.loading = true;
      const userImage = this.image;
      const update = { userImage };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log(res);
          sessionStorage.setItem('domainpic', res);
          this.toaster.showSuccess(
            'Profile image updated it may take some time to reflect in some places'
          );
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
        },
      });
    } else {
      this.toaster.showWarning('Form invalid');
    }
  }

  updateEmergency() {
    if (this.updateForm.get('emergency')?.valid) {
      document.getElementById('emergencyModalClose')?.click();
      const emergencyNumber = this.updateForm.value.emergency;
      const update = { emergencyNumber };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess('Emergency Number updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      this.toaster.showWarning('Form invalid');
    }
  }

  updateAddress() {
    if (this.updateForm.get('address')?.valid) {
      document.getElementById('addressModalClose')?.click();
      const address = this.updateForm.value.address;
      const update = { address };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess('Address updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          this.updateForm.reset();
        },
      });
    } else {
      this.toaster.showWarning('Form invalid');
    }
  }

  updatePassword() {
    if (
      this.updateForm.get('password')?.valid &&
      this.updateForm.get('cpassword')?.valid
    ) {
      const password = this.updateForm.value.password;
      const cpassword = this.updateForm.value.cpassword;
      const oldpassword = this.updateForm.value.oldpassword;

      if (password == cpassword) {
        if (oldpassword == this.account.password) {
          document.getElementById('passwordModalClose')?.click();
          const update = { password };
          this.api.updateAccount(update).subscribe({
            next: (res: any) => {
              this.toaster.showSuccess('password updated !');
              this.accountDetails();
              this.updateForm.reset();
            },
            error: (err: any) => {
              this.toaster.showError(err.error);
              this.updateForm.reset();
            },
          });
        } else {
          this.toaster.showWarning(
            "Old password doesn't match with our database !"
          );
        }
      } else {
        this.toaster.showWarning('password do not match');
      }
    } else {
      this.toaster.showError('form invalid !');
    }
  }

  updateName() {
    if (this.updateForm.get('fname')?.valid) {
      document.getElementById('nameModalClose')?.click();
      const firstName = this.updateForm.value.fname;
      const update = { firstName };
      console.log('request recieve');

      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          console.log('request gener');

          this.toaster.showSuccess('Name updated !');
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          this.updateForm.reset();
        },
      });
    } else if (this.updateForm.get('lname')?.valid) {
      document.getElementById('nameModalClose')?.click();
      const lastName = this.updateForm.value.lname;
      const update = { lastName };
      this.api.updateAccount(update).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess('Name updated !');
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
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
          this.toaster.showSuccess('Name updated !');
          this.updateForm.reset();
          this.accountDetails();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          this.updateForm.reset();
        },
      });
    }
  }
}
