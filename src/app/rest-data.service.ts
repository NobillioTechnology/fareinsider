import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestDataService {
  baseUrl="http://webapi.i2space.co.in/"
  baseUrl_2= "http://api.fareinsider.com/Api/"
  baseUrl_3="https://api.msg91.com/api/v5/"
  constructor(private http: HttpClient) {
   }
   otpGetApiMethod(apiName): Observable < any> {
    let httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
    };
    return this.http.get(this.baseUrl_3+apiName,httpOptions);
    }
    otpPostApiMethod(dataInfo,apiName): Observable<any>{
      console.log("hhh=>>>", dataInfo)
      let httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // "Access-Control-Allow-Origin":"*"
      // 'Authorization': localStorage.getItem("token")
      })
      };
      return this.http.post(this.baseUrl_3+apiName, dataInfo,httpOptions);    
      }
   testGetApiMethod(apiName): Observable < any> {
    let httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
  
    })
    };
    return this.http.get(this.baseUrl_2+apiName,httpOptions);
    }
    testPostApiMethod(dataInfo,apiName): Observable<any>{
      console.log("hhh=>>>", dataInfo)
      let httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // "Access-Control-Allow-Origin":"*"
      // 'Authorization': localStorage.getItem("token")
      })
      };
      return this.http.post(this.baseUrl_2+apiName, dataInfo,httpOptions);
      
      }

   getApiMethod(apiName): Observable < any> {
    let httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin":"*",
    // 'Authorization': localStorage.getItem("token")
    'ConsumerKey':'8F205012D60BABE1B33C58295AD5281D2CDAB916',
    'ConsumerSecret':'0C3D6F0A07E7E1F85CAADAF4A53459BA008CF6E4'
    })
    };
    return this.http.get(this.baseUrl+apiName,httpOptions);
    }
    postApiMethod(dataInfo,apiName): Observable<any>{
      console.log("hhh=>>>", dataInfo)
      let httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ConsumerKey':'8F205012D60BABE1B33C58295AD5281D2CDAB916',
      'ConsumerSecret':'0C3D6F0A07E7E1F85CAADAF4A53459BA008CF6E4',
      // "Access-Control-Allow-Origin":"*"
      // 'Authorization': localStorage.getItem("token")
      })
      };
      return this.http.post(this.baseUrl+apiName, dataInfo,httpOptions);
      
      }
}
