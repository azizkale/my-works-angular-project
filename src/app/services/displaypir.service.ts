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
  retrieveChaptersNamesByPirId(pirId: any): Observable<any> {
    return this.http.get(environment.url + `/display/retrievechaptersbypirid?pirId=${pirId}`)
  }
  retrieveChapterByChapterId(chapterId: any, pirId: any): Observable<any> {
    return this.http.get(environment.url + `/display/retrievechapterbychapterid?chapterId=${chapterId}&pirId=${pirId}`)
  }
}
