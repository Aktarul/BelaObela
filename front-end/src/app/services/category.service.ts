import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";


@Injectable()
export class CategoryService {

  constructor(private http: Http) { }


  getCategory(){

    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get('http://localhost:5500/category',{headers: headers})
      .map(res => res.json())
  }

}
