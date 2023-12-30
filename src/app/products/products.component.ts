import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  loading: boolean = false;
  allProperties: any = [];
  constructor(private api: ApiService,private toaster:ToasterService) {}
  ngOnInit(): void {
    this.loading = true;
    this.api.propertiesAPI().subscribe((res) => {
      this.allProperties = res;
      this.loading = false;
      // console.log(res);
    });
  }

  addtoWishlist(property: any) {
    this.loading = true;
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlistAPI(property).subscribe({
        next: (res: any) => {
          this.loading = false;
          this.toaster.showSuccess(`product added to wishlist !`);
        },
        error: (err: any) => {
          this.toaster.showError(err.error);
          console.log(err.error);
        },
      });
    } else {
      this.toaster.showWarning('Login to continue ');
    }
  }
  
}
