import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }


  getCategory(){

    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get('http://localhost:5500/category',{headers: headers})
      .map(res => res.json())
  }

  deleteCategory(id) {
    let headers = new Headers();

    this.loadToken();

    console.log('In delete category');

    console.log('Category ID: '+ id);

    headers.append('authorization',this.authToken);
    headers.append('Content-Type','application/json');

    return this.http.delete(`http://localhost:5500/category/${id}`,{headers:headers})
      .map( res => res.json());

  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
