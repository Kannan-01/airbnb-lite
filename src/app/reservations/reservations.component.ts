import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  reservations: any = [];
  loading: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this.getReservations();
  }
  constructor(private api: ApiService, private toaster: ToasterService) {}
  getReservations() {
    this.api.getReservations().subscribe({
      next: (res: any) => {
        console.log(res);
        this.reservations = res;
        this.loading = false;
      },
      error(err: any) {
        console.log(err.error);
      },
    });
  }
}
