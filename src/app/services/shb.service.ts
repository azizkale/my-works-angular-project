import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SHB } from 'src/models/shb';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShbService {

  constructor(
    private http: HttpClient,
  ) { }

  createShb(shb: SHB): Observable<any> {
    const body = { shb: shb };
    return this.http.post(environment.url + '/shb/create', body)
  }
}
