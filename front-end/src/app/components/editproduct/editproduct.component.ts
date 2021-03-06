import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product";
import {Category} from "../../model/category";
import {SubCategoryService} from "../../services/sub-category.service";


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  Sub_Category: any[];
  product: Product;
  category: Category[];
  status1 = 'Today Deal';
  status2 = 'Top Product';
  status3 = 'Best Sell';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private subCatService: SubCategoryService
  ) {
    this.product = new Product();
    this.category = [];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

  //console.log(id);
    this.productService.getSingleProduct(id).subscribe(response=>{
      this.product = response.data;
      console.log(this.product);
    })

    this.productService.getCategory()
      .subscribe(response=>{
        this.category = response.data;
      })
    console.log(this.product);


    this.subCatService.getSubCategory()
      .subscribe(res => {
        this.Sub_Category = res.data;
      } )
  }

  update(id){
    console.log('subcat: ');
    console.log(this.product.sub_Category);
    this.productService.updateProduct(id,this.product)
      .subscribe(response=>{
        console.log(response)
      })
    this.router.navigate(['/']);
  }
}
