import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ToasterService } from '../services/toaster.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  ngOnInit(): void {
    this.initConfig();
  }
constructor(private toaster:ToasterService){}
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
                value: '9.99',
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '9.99',
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
        actions.order.get().then((details:any) => {
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
        this.toaster.showSuccess("Your reservation was successfully Placed !")
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.toaster.showWarning("Transaction Denied !")
      },
      onError: (err) => {
        console.log('OnError', err);
        this.toaster.showError("Transaction failed please try after sometime!")
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
