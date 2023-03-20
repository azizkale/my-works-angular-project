import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/models/Book';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css']
})

export class BooktableComponent implements OnInit {
  books: any[];
  width: number; //dynamically book page progress width
  screenSize: number;
  constructor(
    private bookservice: BookService,
    private router: Router,
    private datePipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.retrieveBooks();
    this.screenSize = window.innerWidth;
  }


  retrieveBooks() {
    this.books = [];
    this.bookservice.retrieveBooks().subscribe({
      next: async (response) => {
        response.map((book: Book) => {
          if (book.totalPage !== book.readPage) {
            let obj: Book | any = {
              'bookId': book.bookId,
              'name': book.name,
              'startDate': this.datePipe.transform(book.startDate, 'yyyy-MM-dd'),
              'endDate': this.datePipe.transform(book.endDate, 'yyyy-MM-dd'),
              'totalPage': book.totalPage,
              'author': book.author,
              'bookType': book.bookType,
              'readPage': book.readPage

            }
            this.books.push(obj);
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

  percentageOfABook(book: Book): number {
    return Math.round((book?.readPage / book.totalPage) * 100)
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }

  reload() {
    window.location.reload()
  }
}
