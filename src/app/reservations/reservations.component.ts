import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  reservations: any = [];
  loading: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this.api.getReservations().subscribe((res: any) => {
      this.reservations = res;
      this.loading = false;
    });
  }
  constructor(private api: ApiService) {}
}
