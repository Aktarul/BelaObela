import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  postOrder(order) {
    console.log(order);
    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.post('http://localhost:5500/order', order,{headers: headers})
      .map(res => res.json());
  }

}