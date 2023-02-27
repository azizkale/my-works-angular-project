import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/models/Book';
import { BookType } from 'src/models/BookTypes';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  bookId: any;
  position: number;
  name: string;
  start: Date | any;
  finish: Date | any;
  page: number;
  author: string
}

@Component({
  selector: 'booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})

export class BooklistComponent implements OnInit {
  bookForm: FormGroup; // add book form
  bookManipulateForm: FormGroup; // update/dde book form
  displayedColumns: string[] = ['position', 'Name', 'Start', 'Finish', 'Page', 'Author'];
  dataSource: MatTableDataSource<PeriodicElement>;
  books: any = [];

  constructor(
    private fb: FormBuilder,
    private bookservice: BookService,
    private router: Router,
    private datePipe: DatePipe,
    private el: ElementRef
  ) {
    this.createBookForm();
    this.createBookManipulateForm();

  }
  ngOnInit(): void { this.retrieveBooks() }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //================Creating book
  createBookForm() {
    this.bookForm = this.fb.group({
      bookname: ['', Validators.required],
      numberofpages: ['', Validators.required],
      authorname: ['', Validators.required],
    });
  }
  //================update/delete book
  createBookManipulateForm() {
    this.bookManipulateForm = this.fb.group({
      bookname: ['', Validators.required],
      numberofpages: ['', Validators.required],
      authorname: ['', Validators.required],
      startdate: ['', Validators.required],
      finishdate: ['', Validators.required],
    });
  }


  createBook(bookname: string, numberofpage: any | number, authorname?: string | any) {
    const book = new Book(bookname, numberofpage, new Date(), BookType.PERSONAL, undefined, undefined, authorname)
    this.bookservice.createBook(book).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: async (err) => {
        //unvalid token
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['signin']);
        }
      }
    })
  }

  //================Retrieving book
  retrieveBooks() {
    this.bookservice.retrieveBooks().subscribe({
      next: async (response) => {
        Object.entries(response).map((book: any, index) => {
          let obj: PeriodicElement = {
            'bookId': book[0],
            'position': index + 1,
            'name': book[1].name,
            'start': this.datePipe.transform(book[1].startDate, 'yyyy-MM-dd'),
            'finish': this.datePipe.transform(book[1].finisDate, 'yyyy-MM-dd'),
            'page': book[1].totalPage,
            'author': book[1].author,

          }
          this.books.push(obj)
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.books);
        })
      },
      error: (err) => {
        if (err.status === 401) {
          this.deleteToken();
        }
      }, complete: () => {

      }
    })

  }

  // ===============update book==============
  deleteBook(book: any) {

    this.bookManipulateForm = this.fb.group({
      bookname: [book.name, Validators.required],
      numberofpages: [book.page, Validators.required],
      authorname: [book.author, Validators.required],
      startdate: [book.start, Validators.required],
      finishdate: [book.finis, Validators.required],
    });
  }


  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }

}
