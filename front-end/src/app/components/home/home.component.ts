import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products : any = [];
  isAdmin: any;
  Category: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private catService: CategoryService
  ) {
    this.products = [];
    if(localStorage.getItem('isAdmin')=="true")
      this.isAdmin =1;
    // console.log(this.isAdmin);
  }

  ngOnInit() {
    this.productService.getProduct()
      .subscribe( response =>{
        this.products = response.data;
        // console.log(this.products);
      });
    this.catService.getCategory()
      .subscribe(res => {
        // console.log(res);
        this.Category = res.data;
      });
  }

  cart(cnt,productId,product){
    this.productService.storeUserDatta(cnt,productId,product);
  }

  detailsView(id){
    this.router.navigate([`/details/${id}`])
  }

  editProduct(id){
    this.router.navigate([`/edit/${id}`])
  }

  delFunc(prod){
    this.products.splice(this.products.indexOf(prod), 1);
    this.productService.deleteProduct(prod._id).subscribe(respnse=>{
    });
  }

  catSelect(category) {
    console.log('At category select');
    this.productService.getCategoryProduct(category)
      .subscribe(res => {
        console.log(res);
      });
  }
}
