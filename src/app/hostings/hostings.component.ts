import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-hostings',
  templateUrl: './hostings.component.html',
  styleUrls: ['./hostings.component.css'],
})
export class HostingsComponent implements OnInit {
  hostings: any = [];
  loading: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this.getHostings();
  }
  constructor(private api: ApiService, private toaster: ToasterService) {}
  getHostings() {
    this.api.getHostings().subscribe({
      next: (res: any) => {
        console.log(res);
        this.hostings = res;
        this.loading = false;
        // console.log(this.hostings);
      },
      error(err: any) {
        console.log(err.error);
      },
    });
  }

  cancelHosting(propertyId: any) {
    console.log(typeof propertyId);
    this.api.deleteHostings(propertyId).subscribe({
      next: (res: any) => {
        this.toaster.showSuccess('Hosting Cancelled Succesfully !');
        this.getHostings();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }
}
