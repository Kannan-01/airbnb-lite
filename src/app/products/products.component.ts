import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  loading: boolean = false;
  allProperties: any = [];
  constructor(private api: ApiService) {}
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
          alert(`product added to wishlist !`);
        },
        error: (err: any) => {
          alert(err.error);
          console.log(err.error);
        },
      });
    } else {
      alert('Login to continue ');
    }
  }
  
}
