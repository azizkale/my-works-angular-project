import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  books: any[]
  displayedColumns: string[] = ['No.', 'Book Name', 'Page Count', ' '];
  dataSource: MatTableDataSource<Book>;
  constructor(
    private bookservice: BookService,
    private router: Router,
    private datePipe: DatePipe

  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


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
            let obj: Book | any = {
              'bookId': book.bookId,
              'name': book.name,
              'startDate': this.datePipe.transform(book.startDate, 'yyyy-MM-dd'),
              'endDate': this.datePipe.transform(book.endDate, 'yyyy-MM-dd'),
              'totalPage': book.totalPage,
              'author': book.author,
              'bookType': book.bookType

            }
            this.books.push(obj);
          }
        })
        this.dataSource = new MatTableDataSource<Book>(this.books);

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
