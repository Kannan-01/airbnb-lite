import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-hostings',
  templateUrl: './hostings.component.html',
  styleUrls: ['./hostings.component.css'],
})
export class HostingsComponent implements OnInit {
  hostings:any={}
  ngOnInit(): void {
    this.getHostings()
  }
  constructor(private api: ApiService) {}
  getHostings() {
    this.api.getHostings().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.hostings=res
      },
      error(err: any) {
        console.log(err.error);
      },
    });
  }
}
