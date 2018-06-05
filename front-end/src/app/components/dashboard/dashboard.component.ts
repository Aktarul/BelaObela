import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../services/order.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Order: any[];

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.orderService.getOrder()
      .subscribe(res => {
        console.log(res);
        this.Order = res.data;
      });

  }
}
