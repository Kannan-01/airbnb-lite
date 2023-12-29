import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  property: any = {};
  loading:boolean=false
  constructor(private api:ApiService,private route:ActivatedRoute){
  }
  ngOnInit(): void {
    this.loading=true
    this.route.params.subscribe((res: any) => {
      console.log(res);
      const {id}  = res;      
        this.api.viewPropertyAPI(id).subscribe({
          next: (res: any) => {
            this.property = res;
            console.log(res);
            this.loading=false
          },
          error: (err: any) => {
            console.log(err.error);
          },
        });
    });
  }


}
