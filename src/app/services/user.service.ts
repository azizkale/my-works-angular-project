import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  getUserById(uid: any): Observable<any> {
    return this.http.get(environment.url + `/users/getUserById?uid=${uid}`)
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
}
