import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { CategoryService } from "../../services/category.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { DataTransferService } from "../../services/data-transfer.service";
import { SubCategoryService } from "../../services/sub-category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  temp_category: any;
  sub_Category: any;
  temp_Sub_Category_Product: any = [];
  Sub_Category_Product: any = [];
  Sub_Category: any = [];
  products : any = [];
  temp_products : any = [];
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
    private dataTransferService: DataTransferService,
    private catService: CategoryService,
    private _flashMessagesService: FlashMessagesService,
    private subCatService: SubCategoryService
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

    this.subCatService.getSubCategory()
      .subscribe(res => {
        this.Sub_Category = res.data;
      } );

    this.dataTransferService.newDataSubject.subscribe(
      data => {
        console.log(data);
        // this.products = data;
        this.catBool = true;
        this.allProductBool = true;
        // this.selectedCat = category;
        this.dataTransferService.newCatSubject.subscribe(
          data2 => {
            this.selectedCat = data2.category;
            this.catSelect(data2);
            // console.log(data2);
          }
        )
      }
    );
    // getting searched data
    this.dataTransferService.searchData.subscribe(
      data3 => {
        // this.products = [];
        this.products = data3.data;
        this.catBool = false;
        this.allProductBool = true;
        console.log(this.products);
      }
    );

    this.topProduct();
    this.bestSell();
    this.todayDeals();
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

  delFunc(product){
    this.productService.deleteProduct(product._id).subscribe(res => {
      // console.log(res);
      if(res.success) {
        this.products.splice(this.products.indexOf(product), 1);

        if(res.data.status == 'Today Deal'){
          // console.log(this.todayDealsProducts);
          this.todayDealsProducts.splice(this.products.indexOf(product), 1);
          // console.log(this.todayDealsProducts);
        } else if(res.data.status == 'Best Sell') {
          this.bestSellProducts.splice(this.products.indexOf(product), 1);
        } else if(res.data.status == 'Top Product'){
          this.topProducts.splice(this.products.indexOf(product), 1);
        }
        this._flashMessagesService.show('Product Deleted', {cssClass: 'alert-success'});
        this.ngOnInit();

      } else {
        this._flashMessagesService.show('Product can not be delete', {cssClass: 'alert-danger'});
      }
    });
  }

  topProduct() {
    this.topSearch = 'Top Product';
    // console.log('At top search = ' + this.topSearch);
    this.productService.getTopProduct(this.topSearch)
      .subscribe(res => {
        // console.log(res.data);
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
        // console.log(res.data);
        this.bestSellProducts = res.data;
      });
  }

  todayDeals() {
    this.todaySearch = 'Today Deal';
    this.productService.getTopProduct(this.todaySearch)
      .subscribe(res => {
        // console.log(res.data);
        this.todayDealsProducts = res.data;
      });
  }


  getAllProducts() {
    this.allProductBool = true;
    this.catBool = false;
    this.productService.getProduct()
      .subscribe( response =>{
        this.products = response.data;
        // console.log(this.products);
      });
  }

  catSelect(category) {
    this.temp_products= [];
    this.products = [];
    // this.temp_category = category;
    this.sub_Category = null;
    // console.log('At category select');
    this.productService.getCategoryProduct(category.category)
      .subscribe(res => {
        // console.log(res.data);
        this.catBool = true;
        this.allProductBool = true;
        this.selectedCat = category.category;

        let j = 0;
        for(let i = 0; i < res.data.length; i++){
          if(res.data[i].category == this.selectedCat){
            this.temp_products[j] = res.data[i];
            j++;
          }
        }
        this.products = this.temp_products;
        this.Sub_Category_Product = this.temp_products; // used to store every selected category product
        // console.log(this.temp_products);

        this.subCatService.getSubCategorySearch(category._id)
          .subscribe(res => {
            // console.log(res.data);
            this.Sub_Category = res.data;
            // console.log(this.SubCategory);
          });
      });
    // console.log(this.catBool);


  }

  getProductBySubCat() {

    if(this.sub_Category == null || this.sub_Category == 'Select a subcategory...') {
      this._flashMessagesService.show('No sub-category selected!', {cssClass: 'alert-danger'});
      return;
    }

    let temp_sub_Category = this.sub_Category;
    // this.catSelect(this.temp_category);

    // this.Sub_Category_Product is used to store every selected category product
    this.temp_Sub_Category_Product = [];
    console.log('sub cat:' + temp_sub_Category);
    let j = 0;
    for(let i = 0; i < this.Sub_Category_Product.length; i++){
      // console.log(this.products[i].sub_Category);
      if(this.Sub_Category_Product[i].sub_Category == temp_sub_Category){
        this.temp_Sub_Category_Product[j] = this.Sub_Category_Product[i];
        // console.log(this.products[i].sub_Category);
        // console.log(this.sub_Category);
        j++;
      }
    }
    this.products = this.temp_Sub_Category_Product;
    console.log(this.products);
  }
}
