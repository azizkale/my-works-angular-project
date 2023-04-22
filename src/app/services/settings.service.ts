import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
  ) { }

  updateUser(updateObject: Object): Observable<any> {
    const body = { updateObject: updateObject };
    return this.http.patch(environment.url + '/settings/updateuser', body)
  }

  retrieveUserInfo(): Observable<any> {
    return this.http.get(environment.url + '/settings/getuserinfo')
  }

  updateUserPassword(newPassword: any): Observable<any> {
    const body = { newPassword: newPassword };
    return this.http.patch(environment.url + '/settings/updateuserpassword', body)
  }
}
