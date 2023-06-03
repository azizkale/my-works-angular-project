import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  roles = JSON.parse(localStorage.getItem('roles')!.toString())
  constructor(
    private http: HttpClient
  ) {
  }

  checkRole(role: string): boolean {
    return this.roles.includes(role)
  }

  //to show or hide some links in sidebars
  getUserRoles(uid: any): Observable<any> {
    return this.http.get(environment.url + `/users/getuserroles?uid=${uid}`)
  }

  getUserRolesInTheGroup(groupId: any, userId: any): Observable<any> {
    return this.http.get(environment.url + `/users/getuserrolesofthegroup?groupId=${groupId}&userId=${userId}`)
  }
}
