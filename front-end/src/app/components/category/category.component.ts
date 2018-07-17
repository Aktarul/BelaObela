import { Component, OnInit } from '@angular/core';
import { CategoryService} from "../../services/category.service";
import {FlashMessagesService} from "angular2-flash-messages";
import { Router } from "@angular/router";
import { SubCategoryService } from "../../services/sub-category.service";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Category: any[];
  SubCategory: any[];
  category: String;
  category_id: String;
  input_category: String;
  input_sub_category: String;
  subCategory_clicked = false;

  constructor(private catService: CategoryService,
              private _flashMessagesService: FlashMessagesService,
              private router: Router,
              private subCatService: SubCategoryService
  ) { }

  ngOnInit() {
    this.catService.getCategory()
      .subscribe(res => {
        // console.log(res);
        this.Category = res.data;
      });
  }


  deleteCategory(category) {
    // console.log(category._id);

    this.Category.splice(this.Category.indexOf(category), 1);
    this.catService.deleteCategory(category._id)
      .subscribe(res=>{
        console.log(res);
    });
  }

  addCategory() {

    if(!this.input_category){
      this._flashMessagesService.show('Please input a category name!',{ cssClass: 'alert-danger'});
      return false;
    }

    let data = {
      category: this.input_category
    }

    // console.log('in add category typescript');

    this.catService.addCategory(data)
      .subscribe(res => {
        if(res.success) {
          this._flashMessagesService.show('Category added', { cssClass: 'alert-success'});
          this.redirectTo('category');
        }
        else {
          this._flashMessagesService.show('Something is wrong! Please try again!', { cssClass: 'alert-danger'});
          this.router.navigate(['/category']);
        }
      });
  }


  addSubCategory() {

    console.log(this.category);

    if(!this.category) {
      this._flashMessagesService.show('Please select a category!',{ cssClass: 'alert-danger'});
      return false;
    }

    for(var i = 0 ; i < this.Category.length ; i++){
      if(this.Category[i].category == this.category){
        this.category_id = this.Category[i]._id;
        break;
      }
    }

    console.log(this.category_id);


    if(!this.input_sub_category){
      this._flashMessagesService.show('Please enter a sub-category name!',{ cssClass: 'alert-danger'});
      return false;
    }

    let data = {
      sub_Category: this.input_sub_category,
      category_id: this.category_id
    };

    // console.log('in add category typescript');

    this.subCatService.addSubCategory(data)
      .subscribe(res => {
        if(res.success) {
          this._flashMessagesService.show('Sub-category added', { cssClass: 'alert-success'});
          this.redirectTo('category');
        }
        else {
          this._flashMessagesService.show('Something is wrong! Please try again!', { cssClass: 'alert-danger'});
          this.router.navigate(['/category']);
        }
      });
  }

  showSubCategory(id) {
    console.log(id);
    this.subCatService.getSubCategorySearch(id)
      .subscribe(res => {
        console.log(res.data);
        this.SubCategory = res.data;
        // console.log(this.SubCategory);
      });
    this.subCategory_clicked = true;
  }

  deleteSubCategory(category) {
    // console.log(category._id);

    this.SubCategory.splice(this.SubCategory.indexOf(category), 1);
    this.subCatService.deleteSubCategory(category._id)
      .subscribe(res=>{
        console.log(res);
      });
  }


  redirectTo(uri:string){           // used for redirect
    this.router.navigateByUrl('/address', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }
}
