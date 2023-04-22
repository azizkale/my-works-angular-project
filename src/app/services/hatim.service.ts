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

  createHatim(): Observable<any> {
    return this.http.post(environment.url + '/hatim/create', {})

  }
  retrieveHatim(): Observable<any> {
    return this.http.get(environment.url + '/hatim/retrieve')
  }

  updateHatim(cuz: any, cuznumber: number): Observable<any> {
    const body = { cuz: cuz, cuznumber: cuznumber };
    return this.http.patch(environment.url + '/hatim/update', body)
  }

  getSingleCuz(cuzname: number) {
    return this.http.get(environment.url + `/hatim/retrievesinglecuz?cuznumber=${cuzname}`)
  }

  getReaderName(): Observable<any> {
    return this.http.get(environment.url + '/hatim/getReaderName')
  }

  getNameOfAntoherUsers(uid: any): Observable<any> {
    return this.http.get(environment.url + `/hatim/getAnotherReadersName?uid=${uid}`)
  }
}
