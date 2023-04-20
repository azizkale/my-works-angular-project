import { Injectable } from '@angular/core';
import { AuthGuard } from '../Auth.Guard';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HatimService {

  constructor(
    private http: HttpClient,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  createHatim(): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { token: localStorage.getItem('token') };
      return this.http.post(environment.url + '/hatim/create', body)
    } else {
      return EMPTY;
    }
  }
  retrieveHatim(): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      return this.http.get(environment.url + '/hatim/retrieve', { headers })

    }
    else {
      return EMPTY;
    }

  }

  updateHatim(cuz: any, cuznumber: number): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { cuz: cuz, cuznumber: cuznumber, token: localStorage.getItem('token') };

      return this.http.patch(environment.url + '/hatim/update', body)

    } else {
      return EMPTY;
    }
  }

  getSingleCuz(cuzname: number) {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      // return this.http.get(environment.url + '/hatim/retrieve', { headers })
      return this.http.get(environment.url + `/hatim/retrievesinglecuz?cuznumber=${cuzname}`, { headers })
    }
    else {
      return EMPTY;
    }
  }

  getReaderName(): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      // return this.http.get(environment.url + '/hatim/retrieve', { headers })
      return this.http.get(environment.url + '/hatim/getReaderName', { headers })

    }
    else {
      return EMPTY;
    }
  }

  getNameOfAntoherUsers(uid: any): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      return this.http.get(environment.url + `/hatim/getAnotherReadersName?uid=${uid}`, { headers })

    }
    else {
      return EMPTY;
    }
  }
}
