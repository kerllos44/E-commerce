import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shared/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

private readonly _HttpClient = inject(HttpClient)

  constructor() { }

getAllProducts():Observable<any>{
  return this._HttpClient.get(`${environement.baseUrl}/api/v1/products`)

}


getSpecificproducts(id:string):Observable<any>{
  return this._HttpClient.get(`${environement.baseUrl}/api/v1/products/${id}`)
}


}
