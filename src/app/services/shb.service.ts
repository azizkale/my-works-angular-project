import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { SHB } from 'src/models/shb';
import { AuthGuard } from '../Auth.Guard';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShbService {

  constructor(
    private http: HttpClient,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  createShb(shb: SHB): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { shb: shb, token: localStorage.getItem('token') };
      return this.http.post(environment.url + '/shb/create', body)
    } else {
      // User is not authenticated, navigate to the login page   
      return EMPTY;
    }
  }
}
