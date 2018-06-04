import { Component, OnInit } from '@angular/core';
import { CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Category: any[];

  constructor(private catService: CategoryService) { }

  ngOnInit() {
    this.catService.getCategory()
      .subscribe(res => {
        console.log(res);
        this.Category = res.data;
      });
  }


  deleteCategory(category) {
    // console.log(category._id);

    this.Category.splice(this.Category.indexOf(category), 1);
    this.catService.deleteCategory(category._id).subscribe(res=>{
      console.log(res);
    });
  }

  addCategory(category) {

  }

}
