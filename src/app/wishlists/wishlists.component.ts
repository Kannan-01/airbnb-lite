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

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.getWishlist(); 
  }
  getWishlist() {
    this.loading = true;
    this.api.getWishlistAPI().subscribe((res: any) => {
      this.allWishlist = res;
      this.loading = false;   
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
}
