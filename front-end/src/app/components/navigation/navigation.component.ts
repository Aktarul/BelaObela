import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from "../../services/category.service";
import { DataTransferService } from "../../services/data-transfer.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  Category: any;

  public isAdmin = 0;
  constructor(public productService: ProductService,
              public authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private catService: CategoryService,
              public getDataService: DataTransferService
  ) {
    if(localStorage.getItem('isAdmin') == 'true')
      this.isAdmin = 1;
    // console.log(this.isAdmin);
  }

  ngOnInit() {
    this.catService.getCategory()
      .subscribe(res => {
        // console.log(res);
        this.Category = res.data;
      });
  }

  onLogoutClick() {

    this.authService.logout();

    this.flashMessage.show('Your are successfully logged out!', {cssClass: 'alert-success'});

    this.router.navigate(['/loginregister']);
    return false;

  }

  catSelect(category) {
    this.router.navigate(['/']);
    // console.log('At category select');
    this.productService.getCategoryProduct(category.category)
      .subscribe(res => {
        console.log(res.data);
        this.getDataService.addData(res.data);
        this.getDataService.addCategory(category);
      });
  }

}
