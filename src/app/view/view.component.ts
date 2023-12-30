import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})

export class ViewComponent implements OnInit {
  property: any = {};
  loading: boolean = false;
  userid:any=""
  host:any={}
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.loading = false;
    this.route.params.subscribe((res: any) => {
      const { id } = res;
      this.api.viewPropertyAPI(id).subscribe({
        next: (res: any) => {
          this.property = res;
            this.userid = res.userId;
            this.getHostDetails(this.userid);
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    });
  }
  
  getHostDetails(userid: any) {
    this.api.hostDetails(userid).subscribe({
      next: (res) => {
        // console.log(res);
        this.host=res
        this.loading=false
      },
      error: (err) => {
        console.log('Error  fetching host details:', err);
      },
    });
  }
}  