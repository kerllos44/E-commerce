import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Input, input, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environement } from '../../../shared/environement/environement';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  userToken: any


cartCount : BehaviorSubject<number> = new BehaviorSubject(0)


// cartCount:number = 0

  constructor(private _HttpClient: HttpClient,
     @Inject(PLATFORM_ID) private _PLATFORM_ID: any
  ) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.userToken = { token: sessionStorage.getItem('token') }
    } else {
      this.userToken = {};
    }
  }

  GetLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/cart`, { headers: this.userToken })
  }

  AddProductTocard(p_id: string): Observable<any> {
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/cart`, { "productId": p_id }, { headers: this.userToken })
  }

  RemoveSpecificCartItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${environement.baseUrl}/api/v1/cart/${p_id}`, { headers: this.userToken })
  }

  UpdateCartProductQuan(p_id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environement.baseUrl}/api/v1/cart/${p_id}`, { "count": count }, { headers: this.userToken })
  }

  
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environement.baseUrl}/api/v1/cart`, { headers: this.userToken })
  }


}
