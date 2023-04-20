import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  tokenIsValid: boolean

  constructor(
    private http: HttpClient
  ) { }

  getRoles(): string[] {
    if (localStorage.getItem('roles') !== '[]') {
      const str = localStorage.getItem('roles');
      const roles: string[] = str!.split(',');
      return roles
    }
    return []
  }

  tokenExpiringControl(): boolean {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

    this.http.get(environment.url + '/general/tokenexpiringcontrol', { headers })
      .subscribe({
        next: async (response: any) => {
          if (response.status === 200) {
            this.tokenIsValid = true;
          }
          else {
            this.tokenIsValid = false;
          }
        }
      })
    return this.tokenIsValid
  }
}
