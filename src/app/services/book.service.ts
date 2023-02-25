import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from 'src/models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  createBook(book: Book): Observable<any> {
    const body = { book: book, token: localStorage.getItem('token') };
    return this.http.post(environment.url + '/book/createbook', body)
  }
  retrieveBooks(): Observable<any> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(environment.url + '/book/retrieve', { headers })
  }
}
