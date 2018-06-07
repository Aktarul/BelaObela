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
  topProducts: any = [];
  bestSellProducts: any = [];
  todayDealsProducts: any = [];
  topSearch: any;
  bestSearch: any;
  todaySearch: any;
  isAdmin: any;
  Category: any;
  catBool = false;
  selectedCat: any;
  statusBool = true;
  allProductBool = false;

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
    // console.log(this.catBool);

    this.topProduct();
    this.bestSell();
    this.todayDeals();

    var w = window.innerWidth;
    var h = window.innerHeight;
    console.log('width '+ w + " " + h);
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

  topProduct() {
    this.topSearch = 'Top Product';
    console.log('At top search = '+ this.topSearch);
    this.productService.getTopProduct(this.topSearch)
      .subscribe(res => {
        console.log(res.data);
        this.topProducts = res.data;
      });
  }

  // seeMoreTopProducts() {
  //   this.statusBool = false;
  //   this.topSearch = 'Top Product';
  //   console.log('At top search = '+ this.topSearch);
  //   this.productService.getTopProduct(this.topSearch)
  //     .subscribe(res => {
  //       console.log(res.data);
  //       this.topProducts = res.data;
  //       this.products = res.data;
  //     });
  // }

  bestSell() {
    this.bestSearch = 'Best Sell';
    this.productService.getTopProduct(this.bestSearch)
      .subscribe(res => {
        console.log(res.data);
        this.bestSellProducts = res.data;
      });
  }

  todayDeals() {
    this.todaySearch = 'Today Deal';
    this.productService.getTopProduct(this.todaySearch)
      .subscribe(res => {
        console.log(res.data);
        this.todayDealsProducts = res.data;
      });
  }


  getAllProducts() {
    this.allProductBool = true;
    this.productService.getProduct()
      .subscribe( response =>{
        this.products = response.data;
        // console.log(this.products);
      });
  }

  catSelect(category) {
    // console.log('At category select');
    this.productService.getCategoryProduct(category)
      .subscribe(res => {
        // console.log(res.data);
        this.products = res.data;
        this.catBool = true;
        this.allProductBool = true;
        this.selectedCat = category;
      });
    // console.log(this.catBool);
  }
}
