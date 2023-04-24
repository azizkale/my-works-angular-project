import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisplaypirService {

  constructor(
    private http: HttpClient,
  ) { }

  retrievePirsNames(): Observable<any> {
    return this.http.get(environment.url + `/display/retrievepirs`)
  }
  retrievePirByPirId() {

  }
}
