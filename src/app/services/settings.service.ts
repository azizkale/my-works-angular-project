import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { AuthGuard } from '../Auth.Guard';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private authGuard: AuthGuard,
    private http: HttpClient,
    private router: Router
  ) { }

  updateUserName(): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { token: localStorage.getItem('token') };

      return this.http.patch(environment.url + '/settings/username', body)

    } else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['signin']);
      return EMPTY;
    }
  }

  retrieveUserInfo(): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      return this.http.get(environment.url + '/settings/getuserinfo', { headers })

    } else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['signin']);
      return EMPTY;
    }
  }
}
