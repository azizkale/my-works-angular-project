import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { AuthGuard } from '../Auth.Guard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pir } from 'src/models/Pir';
import { Chapter } from 'src/models/Chapter';
@Injectable({
  providedIn: 'root'
})
export class PireditService {

  constructor(
    private http: HttpClient,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  createPir(pir: Pir): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { pir: pir, token: localStorage.getItem('token') };
      return this.http.post(environment.url + '/pir/create', body)
    } else {
      // User is not authenticated, navigate to the login page   
      return EMPTY;
    }
  }
  //adds chapters to already existed Pir
  addChapter(chapter: Chapter) {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = {
        chapter: chapter,
        token: localStorage.getItem('token')
      };
      return this.http.post(environment.url + '/pir/addchapter', body)
    } else {
      // User is not authenticated, navigate to the login page   
      return EMPTY;
    }
  }
  retrievePirs(): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      return this.http.get(environment.url + `/pir/getpirs`, { headers })
    }
    else {
      // User is not authenticated, navigate to the login page
      return EMPTY;
    }
  }

  retrieveChaptersByEditorId(editorId: any, pirId: any): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

      return this.http.get(environment.url + `/pir/getchaptersbyeditorid?editorId=${editorId}&pirId=${pirId}`, { headers })
    }
    else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['signin']);
      return EMPTY;
    }
  }

  updateChapter(chapter: Chapter) {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { chapter: chapter, token: localStorage.getItem('token') };

      return this.http.patch(environment.url + '/pir/updatechapter', body)

    } else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['signin']);
      return EMPTY;
    }
  }
  updatePir(pir: Pir) {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { pir: pir, token: localStorage.getItem('token') };

      return this.http.patch(environment.url + '/pir/updatepir', body)

    } else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['signin']);
      return EMPTY;
    }
  }
}
