import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private http: HttpClient

  ) {
  }

  getRoles(): string[] {
    if (localStorage.getItem('roles') !== '[]') {
      const str = localStorage.getItem('roles');
      const roles: string[] = str!.split(',');
      return roles
    }
    return []
  }

  tokenExpiringControl(): Observable<any> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(environment.url + '/general/tokenexpiringcontrol', { headers })
  }
}
