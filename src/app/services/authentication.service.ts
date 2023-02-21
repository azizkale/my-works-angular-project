import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  // Define your request parameters
  url = 'http://localhost:3000';

  signin(email: string, password: any): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post(this.url + '/signin', body)
  }
}
