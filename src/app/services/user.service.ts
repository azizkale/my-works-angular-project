import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { } from 'rxjs/internal/testing/TestScheduler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  retrieveUserById(uid: any): Observable<any> {
    return this.http.get(environment.url + `/users/getUserById?uid=${uid}`)
  }

  retrieveUserByEmail(email: any): Observable<any> {
    if (email !== '')
      return this.http.get(environment.url + `/users/retrieveuserbyemail?email=${email}`)
    else
      return EMPTY
  }

  getAllUsers(): Observable<any> {
    return this.http.get(environment.url + `/users/retrieveallusers`)
  }

  retrieveEditorbyEditorId(editorId: any): Observable<any> {
    return this.http.get(environment.url + `/users/retrieveeditorbyid?editorid=${editorId}`)
  }

  addRoleToUser(uid: any, role: string): Observable<any> {
    const body = { uid: uid, role: role };
    return this.http.patch(environment.url + '/users/addroletouser', body)
  }

  addParticipantToGroup(groupId: any, uid: any, role: string): Observable<any> {
    const body = { groupId: groupId, uid: uid, role: role }
    return this.http.patch(environment.url + `/users/addparticipant`, body)
  }

}

