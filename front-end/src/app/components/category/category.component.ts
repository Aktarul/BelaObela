import { Component, OnInit } from '@angular/core';
import { CategoryService} from "../../services/category.service";
import {FlashMessagesService} from "angular2-flash-messages";
import { Router } from "@angular/router";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Category: any[];
  input_category: String;

  constructor(private catService: CategoryService,
              private _flashMessagesService: FlashMessagesService,
              private router: Router
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
          this.router.navigate(['/product']);
        }
        else {
          this._flashMessagesService.show('Something is worng! Please try again!', { cssClass: 'alert-danger'});
          this.router.navigate(['/category']);
        }
      });
  }
}
