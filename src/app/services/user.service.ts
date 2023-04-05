import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuard } from '../Auth.Guard';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authGuard: AuthGuard,
  ) { }

  getUserById(): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      // return this.http.get(environment.url + '/hatim/retrieve', { headers })
      return this.http.get(environment.url + '/users/getUserById', { headers })

    }
    else {
      // User is not authenticated, navigate to the login page

      return EMPTY;
    }
  }
}
