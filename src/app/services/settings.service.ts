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

  updateUser(updateObject: Object): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { updateObject: updateObject, token: localStorage.getItem('token') };

      return this.http.patch(environment.url + '/settings/updateuser', body)

    } else {
      return EMPTY;
    }
  }

  retrieveUserInfo(): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      return this.http.get(environment.url + '/settings/getuserinfo', { headers })

    } else {
      return EMPTY;
    }
  }

  updateUserPassword(newPassword: any): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { newPassword: newPassword, token: localStorage.getItem('token') };

      return this.http.patch(environment.url + '/settings/updateuserpassword', body)

    } else {
      return EMPTY;
    }
  }
}
