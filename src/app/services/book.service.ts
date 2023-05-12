import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from 'src/models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
  ) { }

  createBook(book: Book): Observable<any> {
    const body = { book: book };
    return this.http.post(environment.url + '/book/create', body)
  }

  retrieveBooks(): Observable<any> {
    return this.http.get(environment.url + '/book/retrieve')
  }

  updateBook(book: Book): Observable<any> {
    const body = { book: book };
    return this.http.patch(environment.url + '/book/update', body)
  }

  deleteBook(bookId: string): Observable<any> {
    const body = { bookId: bookId };
    return this.http.delete(environment.url + '/book/delete', { body })
  }


}
