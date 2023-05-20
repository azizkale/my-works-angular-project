import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HatimService {

  constructor(
    private http: HttpClient
  ) { }

  createHatim(groupId: any): Observable<any> {
    const body = { groupId: groupId };
    return this.http.post(environment.url + '/hatim/create', body)

  }
  retrieveHatim(groupId: any): Observable<any> {
    return this.http.get(environment.url + `/hatim/retrieve?groupId=${groupId}`)
  }

  updateHatim(cuz: any, cuznumber: number, groupId: any): Observable<any> {
    const body = { cuz: cuz, cuznumber: cuznumber, groupId: groupId };
    return this.http.patch(environment.url + '/hatim/update', body)
  }

  getSingleCuz(cuzname: number, groupId: any) {
    return this.http.get(environment.url + `/hatim/retrievesinglecuz?cuzname=${cuzname}&groupId=${groupId}`)
  }

  getReaderName(): Observable<any> {
    return this.http.get(environment.url + `/hatim/getReaderName`)
  }

  // getNameOfAntoherUsers(uid: any): Observable<any> {
  //   return this.http.get(environment.url + `/hatim/getAnotherReadersName?uid=${uid}`)
  // }
}
