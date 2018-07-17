import { Component, OnInit } from '@angular/core';
import { ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {ValidateService} from "../../services/validate.service";
import { SubCategoryService } from "../../services/sub-category.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  Category: object;
  Sub_Category: any[];
  name: String;
  description: String;
  picture: String;
  price: String;
  category: String;
  sub_Category: String;
  avl: String;
  status: String;
  status1 = 'Today Deal';
  status2 = 'Top Product';
  status3 = 'Best Sell';

  constructor(
    private productService: ProductService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private subCatService: SubCategoryService
  ) {
      this.Category = [];
  }

  ngOnInit() {
    this.productService.getCategory()
      .subscribe( response=>{
          this.Category = response.data;
      });

    this.subCatService.getSubCategory()
      .subscribe(res => {
        this.Sub_Category = res.data;
      } )
  }

  onRegisterSubmit(){

    const product = {
      name: this.name,
      category: this.category,
      sub_Category: this.sub_Category,
      description: this.description,
      price: this.price,
      avl: this.avl,
      status: this.status
    };

    // console.log(this.category);

    this.productService.registerProduct(product).subscribe( response=>{
      if(response.success) {
        // console.log(product.category);

        // console.log(response.data._id);
        let id = response.data._id;
        this.flashMessage.show('Successfully created Product. Now upload picture',{cssClass:'alert-success'});
        this.router.navigate([`/photo/${id}`]);
      }
      else {
        this.router.navigate(['/product']);
      }
    })
  }
}
