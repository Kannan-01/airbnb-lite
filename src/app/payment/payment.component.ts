import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ToasterService } from '../services/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  price: any = '';
  days: any = '';
  totalWithoutTaxes: any = '';
  taxes: any = '';
  totalWithTax: any = '';
  property: any = {};
  checkin = sessionStorage.getItem('checkin');
  checkout = sessionStorage.getItem('checkout');
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const { id } = res;
      this.api.viewPaymentAPI(id).subscribe({
        next: (res: any) => {
          this.property = res;
        },
        error(err: any) {
          console.log(err.error);
        },
      });
    });
    this.initConfig();
    if (
      sessionStorage.getItem('price') &&
      sessionStorage.getItem('days') &&
      sessionStorage.getItem('totalWithoutTaxes')
    ) {
      this.price = sessionStorage.getItem('price');
      this.days = sessionStorage.getItem('days');
      this.totalWithoutTaxes = sessionStorage.getItem('totalWithoutTaxes');
    }
    this.calculate();
  }
  constructor(
    private toaster: ToasterService,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  calculate() {
    const price = this.totalWithoutTaxes;
    const withoutTax: number = parseInt(price, 10);
    this.taxes = (withoutTax * 12) / 100;
    this.totalWithTax = `${Math.ceil(this.taxes + withoutTax)}`;
  }

  initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.totalWithTax,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.totalWithTax,
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        const checkin = sessionStorage.getItem('checkin');
        const checkout = sessionStorage.getItem('checkout');
        const guests = sessionStorage.getItem('guests');
        const amount = this.totalWithTax;
        const propertyId = this.property._id;
        const title = this.property.title;
        const state = this.property.state;
        const district = this.property.district;
        const city = this.property.city;
        const image = this.property.image;
        const category = this.property.category;

        const reserve = {
          checkin,
          checkout,
          guests,
          amount,
          propertyId,
          title,
          state,
          district,
          city,
          image,
          category,
        };
        this.api.reserveAPI(reserve).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (err: any) => {
            console.log(err.error);
          },
        });

        this.toaster.showSuccess('Your reservation was successfully Placed !');
        this.router.navigateByUrl('/');
        sessionStorage.setItem('checkin', '');
        sessionStorage.setItem('checkout', '');
        sessionStorage.setItem('totalWithoutTaxes', '');
        sessionStorage.setItem('guests', '');
        sessionStorage.setItem('price', '');
        sessionStorage.setItem('days', '');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.toaster.showWarning('Transaction Denied !');
      },
      onError: (err) => {
        console.log('OnError', err);
        this.toaster.showError('Transaction failed please try after sometime!');
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
