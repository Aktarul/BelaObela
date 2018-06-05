import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address: String;
  mobile_no: String;

  constructor(
    private router: Router
  ) { }



  ngOnInit() {

    console.log(localStorage.getItem(''))
  }

  order() {


    let navigationExtras : NavigationExtras = {
      queryParams: {
        "address": this.address,
        "mobile_no": this.mobile_no
      }
    }
    this.router.navigate([`/confirm`], navigationExtras);

  }

}
