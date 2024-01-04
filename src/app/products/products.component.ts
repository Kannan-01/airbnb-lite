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

  constructor(private api: ApiService, private toaster: ToasterService) {}
  ngOnInit(): void {
    this.getProperties();
  }

  getProperties() {
    this.loading = true;
    this.api.propertiesAPI().subscribe((res) => {
      this.loading = false;
      this.allProperties = res;
    });
  }

  addtoWishlist(property: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlistAPI(property).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess(`Added to wishlist !`);
        },
        error: (err: any) => {
          this.toaster.showWarning(err.error);
        },
      });
    } else {
      this.toaster.showWarning('Login to continue ');
    }
  }
}
