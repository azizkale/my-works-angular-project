import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from 'src/models/Book';
import { AuthGuard } from '../Auth.Guard'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  createBook(book: Book): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { book: book, token: localStorage.getItem('token') };
      return this.http.post(environment.url + '/book/createbook', body)
    } else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['signin']);
      return EMPTY;
    }

  }
  retrieveBooks(): Observable<any> {

    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));
      return this.http.get(environment.url + '/book/retrieve', { headers })
    } else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['signin']);
      return EMPTY;
    }

  }

  deleteBook(bookId: string): Observable<any> {
    if (this.authGuard.canActivate()) {
      // User is authenticated, return the data
      const body = { bookId: bookId, token: localStorage.getItem('token') };

      return this.http.delete(environment.url + '/book/deletebook', { body })

    } else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['signin']);
      return EMPTY;
    }
  }
}
