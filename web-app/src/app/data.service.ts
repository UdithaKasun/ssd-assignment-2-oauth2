import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: String = 'http://localhost:3000';
  accessToken: String = '';

  constructor(private http: HttpClient) { }

  setToken(tokenObj){  
      console.log(tokenObj.access_token);
      this.accessToken = tokenObj.access_token; 
  }

  getToken() {
    return this.accessToken;
  }

  generateToken(code: String) {
    return this.http.post(this.baseUrl+"/token", {"code":code});
  }

  getUserInfo() {
    return this.http.post(this.baseUrl+"/data", {"accessToken":this.getToken()});
  }
}
