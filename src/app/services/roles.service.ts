import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(
    private http: HttpClient
  ) {
  }

  getUserRolesInTheGroup(groupId: any, userId: any): Observable<any> {
    return this.http.get(environment.url + `/users/getuserrolesofthegroup?groupId=${groupId}&userId=${userId}`)
  }
}
