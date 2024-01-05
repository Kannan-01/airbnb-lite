import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnChanges {
  loading: boolean = false;
  allProperties: any = [];
  @Input() searchEvent: string = '';
  searchKey: any = '';
  constructor(private api: ApiService, private toaster: ToasterService) {}
  ngOnInit(): void {
    this.loading = true;
    this.api.propertiesAPI().subscribe((res) => {
      this.loading = false;
      this.allProperties = res;
    });
  }
  ngOnChanges(): void {
    this.searchKey = this.searchEvent;
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
