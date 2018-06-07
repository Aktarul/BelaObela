import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address: String;
  mobile_no: String;

  constructor(
    private router: Router,
    private _flashMessageService: FlashMessagesService
  ) { }



  ngOnInit() {

    // console.log(localStorage.getItem(''))
  }

  order() {

    if(!this.address) {
      this._flashMessageService.show('Please provide an address !', {cssClass: 'alert-danger'});
      return false;
    } else if (!this.mobile_no) {
      this._flashMessageService.show('Please enter you mobile number !', {cssClass: 'alert-danger'});
      return false;
    }

    let navigationExtras : NavigationExtras = {
      queryParams: {
        "address": this.address,
        "mobile_no": this.mobile_no
      }
    }
    this.router.navigate([`/confirm`], navigationExtras);
  }

}
