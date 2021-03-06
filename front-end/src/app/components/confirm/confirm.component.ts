import { Component, OnInit } from '@angular/core';
import { Order } from "../../model/order";
import {ActivatedRoute, Router} from "@angular/router";
import { OrderService } from "../../services/order.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  order =  new Order() ;
  myProductArray :any [];
  user : any;

  product_name: String = "";
  quantity: String = "";

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private _flashMessageService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {

    this.myProductArray = JSON.parse(localStorage.getItem('myProductCart'));
    // console.log(this.myProductArray);

    for(var i = 0 ; i < this.myProductArray.length; i++){
      // console.log(this.myProductArray[i].myProduct.name);
      this.product_name = this.product_name + " + " + this.myProductArray[i].myProduct.name;
      this.quantity = this.quantity + " + " + this.myProductArray[i].myProductCount;
    }

    // console.log(this.product_name);
    // console.log(this.quantity);


    this.user = JSON.parse(localStorage.getItem('user'));
    console.log('email is here:' + this.user.name);
    this.order.user_name = this.user.name;
    this.order.Email = this.user.email;


    this.route.queryParams.subscribe(params => {
      // console.log(params["address"]+ params["mobile_no"]);
      this.order.address = params["address"];
      this.order.mobile_no = params["mobile_no"];
    });

    // console.log(this.order);
  }

  confirm() {
    this.order.product = this.product_name;
    this.order.quantity = this.quantity;

    this.orderService.postOrder(this.order)
      .subscribe(res => {
        // console.log(res);
        if(res.success) {
          localStorage.cnt = 0;
          localStorage.myProductCart = null;
          this._flashMessageService.show('Order Confirmed', {cssClass: 'alert-success'});
          this.router.navigate(['/']);
        } else {
          this._flashMessageService.show('Something went wrong! Can not confirm order!', {cssClass: 'alert-danger'});
        }
      });
  }

}
