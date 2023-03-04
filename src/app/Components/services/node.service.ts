import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor() { }
  url = new Subject<any>();
  error_top = new Subject<any>();
  error_type = new Subject<any>();
  updategid(vale:any){
    this.url.next(vale)
  }
  error_set(vale:any,type:any){
    this.error_top.next(vale)
    this.error_type.next(type)
  }

}
