import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  property: any = {};
  loading: boolean = false;
  userid: any = '';
  host: any = {};

  difference: any = '';
  total: any = '';
  price: any = '';

  reservationForm = this.fb.group({
    checkin: ['', [Validators.required]],
    checkout: ['', [Validators.required]],
    guests: ['', [Validators.required]],
  });

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.difference = '';
    this.total = '';
    this.price = '';
    this.loading = true;
    this.route.params.subscribe((res: any) => {
      const { id } = res;
      this.api.viewPropertyAPI(id).subscribe({
        next: (res: any) => {
          this.property = res;
          this.userid = res.userId;
          this.getHostDetails(this.userid);
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    });
  }

  getHostDetails(userid: any) {
    this.api.hostDetails(userid).subscribe({
      next: (res) => {
        // console.log(res);
        this.host = res;
        this.loading = false;
      },
      error: (err) => {
        console.log('Error  fetching host details:', err);
      },
    });
  }

  checkinChanged(event: any) {
    if (event.target.value) {
      const checkin = this.reservationForm.value.checkin;
      const checkout = this.reservationForm.value.checkout;
      if (checkin && checkout && this.reservationForm.get('guests')?.valid) {
        sessionStorage.setItem('checkin', checkin);
        sessionStorage.setItem('checkout', checkout);
        const checkinDate: Date = new Date(checkin);
        const checkoutDate: Date = new Date(checkout);
        const differenceMs: number = Math.abs(
          checkoutDate.getTime() - checkinDate.getTime()
        );
        const differenceDays: number = Math.ceil(
          differenceMs / (1000 * 60 * 60 * 24)
        );
        this.price = this.property.price;
        const service = 500;
        const totalWithoutTaxes: string = `${
          this.property.price * differenceDays + service
        }`;
        const propertyPrice: string = `${this.property.price}`;
        this.total = totalWithoutTaxes;
        this.difference = differenceDays;
        const days: string = `${differenceDays}`;
        sessionStorage.setItem('price', propertyPrice);
        sessionStorage.setItem('days', days);
        sessionStorage.setItem('totalWithoutTaxes', totalWithoutTaxes);
      }
    }
  }

  checkoutChanged(event: any) {
    if (event.target.value) {
      const checkin = this.reservationForm.value.checkin;
      const checkout = this.reservationForm.value.checkout;
      if (checkin && checkout && this.reservationForm.get('guests')?.valid) {
        sessionStorage.setItem('checkin', checkin);
        sessionStorage.setItem('checkout', checkout);
        const checkinDate: Date = new Date(checkin);
        const checkoutDate: Date = new Date(checkout);
        const differenceMs: number = Math.abs(
          checkoutDate.getTime() - checkinDate.getTime()
        );
        const differenceDays: number = Math.ceil(
          differenceMs / (1000 * 60 * 60 * 24)
        );
        this.price = this.property.price;
        const service = 500;
        const totalWithoutTaxes: string = `${
          this.property.price * differenceDays + service
        }`;
        const propertyPrice: string = `${this.property.price}`;
        this.total = totalWithoutTaxes;
        this.difference = differenceDays;
        const days: string = `${differenceDays}`;
        sessionStorage.setItem('price', propertyPrice);
        sessionStorage.setItem('days', days);
        sessionStorage.setItem('totalWithoutTaxes', totalWithoutTaxes);
      }
    }
  }

  calculate() {
    if (this.reservationForm.valid) {
      const checkin = this.reservationForm.value.checkin;
      const checkout = this.reservationForm.value.checkout;
      const guests = this.reservationForm.value.guests;
      if (checkin && checkout && guests) {
        sessionStorage.setItem('checkin', checkin);
        sessionStorage.setItem('checkout', checkout);
        sessionStorage.setItem('guests', guests);
                const checkinDate: Date = new Date(checkin);
        const checkoutDate: Date = new Date(checkout);
        const differenceMs: number = Math.abs(
          checkoutDate.getTime() - checkinDate.getTime()
        );
        const differenceDays: number = Math.ceil(
          differenceMs / (1000 * 60 * 60 * 24)
        );
        const service = 500;
        const totalWithoutTaxes: string = `${
          this.property.price * differenceDays + service
        }`;
        const propertyPrice: string = `${this.property.price}`;
this.price = this.property.price*differenceDays;
        this.total = totalWithoutTaxes;
        this.difference = differenceDays;
        const days: string = `${differenceDays}`;

        sessionStorage.setItem('price', propertyPrice);
        sessionStorage.setItem('days', days);
        sessionStorage.setItem('totalWithoutTaxes', totalWithoutTaxes);
      }
    } else {
      this.toaster.showWarning('Select the dates & guests');
    }
  }
}
