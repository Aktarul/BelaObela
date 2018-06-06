import { Component, OnInit } from '@angular/core';
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

  deleteOrder(order) {
    // console.log(order._id);
    this.orderService.deleteOrder(order._id)
      .subscribe(res=>{
        console.log(res);
        if (res.success = true) {
          this.Order.splice(this.Order.indexOf(order), 1);
        }
      });
  }
}
