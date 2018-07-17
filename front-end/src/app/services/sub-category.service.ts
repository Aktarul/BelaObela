import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { HttpClientModule} from "@angular/common/http";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class SubCategoryService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }


  getSubCategory(){

    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get('http://localhost:5500/subcategory',{headers: headers})
      .map(res => res.json())
  }

  deleteSubCategory(id) {
    let headers = new Headers();

    this.loadToken();

    console.log('In delete category');

    console.log('Category ID: '+ id);

    headers.append('authorization',this.authToken);
    headers.append('Content-Type','application/json');

    return this.http.delete(`http://localhost:5500/subcategory/${id}`,{headers:headers})
      .map( res => res.json());

  }

  addSubCategory(data) {
    // console.log(category);

    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.post('http://localhost:5500/subcategory',data,{headers: headers})
      .map(res => res.json());
  }

  getSubCategorySearch(id){

    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get(`http://localhost:5500/subcategory/search/${id}`,{headers: headers})
      .map(res => res.json())
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
