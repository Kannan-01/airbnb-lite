import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProperties: any = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.propertiesAPI().subscribe((res) => {
      this.allProperties = res;
      console.log(res);
    });
  }
}
