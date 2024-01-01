import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css'],
})
export class WishlistsComponent implements OnInit {
  allWishlist: any = [];
  loading: boolean = false;
  allProperties: any = [];
  currentlyActive: any = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.loadProperties();
  }

  getWishlist() {
    this.loading = true;
    this.api.getWishlistAPI().subscribe({
      next: (res: any) => {
        // this.allWishlist = res;
        res.forEach((wishlist: any) => {
          this.currentlyActive.forEach((property: any) => {
            if(wishlist.id==property){
              this.allWishlist.push(wishlist);              
            }
          });
        });
        this.loading = false;
      },
      error(err: any) {
        console.log(err.error);
      },
    });
  }

  removeItem(id: any) {
    this.api.deleteWishlistItem(id).subscribe({
      next: (res: any) => {
        this.getWishlist();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  loadProperties() {
    this.api.propertiesAPI().subscribe({
      next: (res: any) => {
        this.allProperties = res;
        res.forEach((property: any) => {
          this.currentlyActive.push(property._id);
        });
        this.getWishlist();
      },
      error(err: any) {
        console.log(err.error);
      },
    });
  }
}
