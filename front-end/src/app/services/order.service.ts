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


  getOrder() {
    let headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get('http://localhost:5500/order',{headers: headers})
      .map(res => res.json());
  }

  deleteOrder(id) {
    let headers = new Headers();

    // this.loadToken();

    console.log('In delete order');

    console.log('order ID: '+ id);

    // headers.append('authorization',this.authToken);
    headers.append('Content-Type','application/json');

    return this.http.delete(`http://localhost:5500/order/${id}`,{headers:headers})
      .map( res => res.json());

  }

}
