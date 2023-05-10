import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  createGroup(groupName: any, mentorId: any): Observable<any> {
    const body = { groupName: groupName, mentorId: mentorId };
    return this.http.post(environment.url + '/group/creategroup', body)
  }
}
