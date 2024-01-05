import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
})
export class HostComponent {
  brandlogo: string = './assets/images/airbnb.png';
  image: any = '';
  hostForm = this.fb.group({
    title: ['', [Validators.required]],
    state: ['', [Validators.required]],
    district: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    city: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    image: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });
  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  host() {
    if (this.hostForm.valid) {
      const title = this.hostForm.value.title;
      const state = this.hostForm.value.state;
      const district = this.hostForm.value.district;
      const city = this.hostForm.value.city;
      const price = this.hostForm.value.price;
      const image = this.hostForm.value.image;
      const description = this.hostForm.value.description;
      const category = this.hostForm.value.category;
      const property = {
        title,
        state,
        district,
        city,
        price,
        image,
        description,
        category,
      };
      this.api.hostAPI(property).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess(`Hosted succesfully !`);
          this.router.navigateByUrl('/hostings');
          this.hostForm.reset();
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          console.log(err.error);
          this.hostForm.reset();
        },
      });
      console.log(property);
    } else {
      this.toaster.showWarning('Invalid form');
      
    }
  }

  getFile(event: any) {
    let file = event.target.files[0];
    console.log(file);
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.hostForm.get('image')?.setValue(event.target.result);
    };
  }
}
