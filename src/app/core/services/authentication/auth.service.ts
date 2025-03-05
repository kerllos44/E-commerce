import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shared/environement/environement';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

userInfo:any

  constructor(private _HttpClient:HttpClient) { }

decodeToken(){
  if(sessionStorage.getItem('token')){
    this.userInfo=  jwtDecode(sessionStorage.getItem('token') !)
    
  }

}


signUp(data:object):Observable<any>{
  return this._HttpClient.post(`${environement.baseUrl}/api/v1/auth/signup` , data)
}

signIn(data:object):Observable<any>{
  return this._HttpClient.post(`${environement.baseUrl}/api/v1/auth/signin` , data)
}

setEmailVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environement.baseUrl}/api/v1/auth/forgotPasswords` , data )
}

setCodeVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environement.baseUrl}/api/v1/auth/verifyResetCode` , data )
}

setResetPass(data:object):Observable<any>{
  return this._HttpClient.put(`${environement.baseUrl}/api/v1/auth/resetPassword` , data )
}



}
