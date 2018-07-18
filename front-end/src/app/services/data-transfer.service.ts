import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map';

@Injectable()
export class DataTransferService {

  public newDataSubject = new Subject<any>();
  public newCatSubject = new Subject<any>();
  public searchData = new Subject<any>();
  constructor(private http: Http) { }

  addData(data) {
    this.newDataSubject.next(data);
  }

  addCategory(data2) {
    this.newCatSubject.next(data2);
  }

  addSearchKey(data3) {
    this.searchData.next(data3);
  }

}
