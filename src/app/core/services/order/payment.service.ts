import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shared/environement/environement';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  userToken: any

  constructor(private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: any
  ) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.userToken = { token: sessionStorage.getItem('token') };
    } else {
      this.userToken = {};
    }
  }


  checkOutSession(c_id: string, data: object): Observable<any> {
    return this._HttpClient.post(
      `${environement.baseUrl}/api/v1/orders/checkout-session/${c_id}?url=${environement.domain}`,
      { 'shippingAddress': data },
      { headers: this.userToken }
    )
  }
}
