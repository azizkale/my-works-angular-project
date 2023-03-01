import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/models/Book';
@Component({
  selector: 'booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css']
})

export class BooktableComponent implements OnInit {
  books: any[]
  constructor(private bookservice: BookService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveBooks();
  }


  retrieveBooks() {
    this.books = [];
    this.bookservice.retrieveBooks().subscribe({
      next: async (response) => {
        response.map((book: Book) => {
          console.log(book)
          if (!book.endDate) {
            this.books.push(book);
          }
        })
      },
      error: (err) => {
        if (err.status === 401) {
          this.deleteToken();
        }
      }
    })
  }

  persentageOfABook(book: Book): number {
    return Math.round((77 / book.totalPage) * 100)
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }
}
