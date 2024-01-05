import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css'],
})
export class WishlistsComponent implements OnInit {
  allWishlist: any = [];
  loading: boolean = false;

  constructor(private api: ApiService, private toaster: ToasterService) {}
  ngOnInit(): void {
    this.loading=true
    this.api.getWishlistAPI().subscribe((res: any) => {
      this.allWishlist = res;
      this.loading=false
    });
  }

  getWishlist() {
    this.api.getWishlistAPI().subscribe((res: any) => {
      this.allWishlist = res;
    });
  }

  removeItem(id: any) {
    this.api.deleteWishlistItem(id).subscribe({
      next: (res: any) => {
        this.toaster.showSuccess('Property removed');
        this.getWishlist();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
