import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  // Define your request parameters
  // url = 'http://localhost:3000' || "http://192.168.0.17:3000";

  signin(email: string, password: any): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post(environment.url + '/signin', body)
  }

  register(email: string, password: any): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post(environment.url + '/users/createuser', body)
  }
}
