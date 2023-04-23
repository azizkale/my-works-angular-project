import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pir } from 'src/models/Pir';
import { Chapter } from 'src/models/Chapter';
@Injectable({
  providedIn: 'root'
})
export class PireditService {

  constructor(
    private http: HttpClient,
  ) { }

  createPir(pir: Pir): Observable<any> {
    const body = { pir: pir };
    return this.http.post(environment.url + '/pir/create', body)
  }
  //adds chapters to already existed Pir
  addChapter(chapter: Chapter) {
    const body = { chapter: chapter };
    return this.http.post(environment.url + '/pir/addchapter', body)
  }

  retrievePirs(): Observable<any> {
    return this.http.get(environment.url + `/pir/getpirs`)
  }

  retrieveChaptersByEditorId(editorId: any, pirId: any): Observable<any> {
    return this.http.get(environment.url + `/pir/getchaptersbyeditorid?editorId=${editorId}&pirId=${pirId}`)
  }

  updateChapter(chapter: Chapter) {
    const body = { chapter: chapter };
    return this.http.patch(environment.url + '/pir/updatechapter', body)
  }

  updatePir(pir: Pir) {
    const body = { pir: pir };
    return this.http.patch(environment.url + '/pir/updatepir', body)
  }
}
