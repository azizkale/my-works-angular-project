import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { AuthGuard } from '../Auth.Guard';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pir } from 'src/models/Pir';
@Injectable({
  providedIn: 'root'
})
export class PireditService {

  constructor(
    private http: HttpClient,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  createPir(pir: Pir): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { pir: pir, token: localStorage.getItem('token') };
      return this.http.post(environment.url + '/pir/create', body)
    } else {
      // User is not authenticated, navigate to the login page   
      return EMPTY;
    }
  }
}