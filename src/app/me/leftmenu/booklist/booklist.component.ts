import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { BookType } from 'src/models/BookTypes';
import { DatePipe } from '@angular/common';
import { Book } from 'src/models/Book';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})

export class BooklistComponent implements OnInit {
  @ViewChild('alertParent', { static: true }) alertParent: ElementRef
  bookForm: FormGroup; // add book form
  bookManipulateForm: FormGroup; // update/dde book form
  displayedColumns: string[] = ['position', 'Name', 'Start', 'Finish', 'Page', 'Read', 'Author'];
  dataSource: MatTableDataSource<Book>;
  books: Book | any = [];

  constructor(
    private fb: FormBuilder,
    private bookservice: BookService,
    private router: Router,
    private datePipe: DatePipe,
    private alertsservice: AlertsService
  ) {


  }
  ngOnInit(): void {
    this.retrieveBooks();
    this.createBookForm();
    this.createBookManipulateForm();

  }
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
  //================update/delete book form
  createBookManipulateForm() {
    this.bookManipulateForm = this.fb.group({
      bookId: [''],
      booktype: ['', Validators.required],
      bookname: ['', Validators.required],
      numberofpages: ['', Validators.required],
      authorname: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      readpage: ['', [Validators.required]],
    });


  }

  // =============CRUD Operations==========================
  createBook(bookname: string, numberofpage: any | number, authorname?: string | any) {
    const book = new Book(bookname, numberofpage, new Date(), BookType.PERSONAL, undefined, 0, authorname)
    this.bookservice.createBook(book).subscribe({
      next: (res) => {
        this.retrieveBooks();
      },
      error: async (err) => {
        //unvalid token
        if (err.status === 401) {
          this.deleteToken();
        }
      }
    })
  }

  //================Retrieving book=============
  retrieveBooks() {
    this.books = []
    this.bookservice.retrieveBooks().subscribe({
      next: async (response) => {
        Object.entries(response).map((book: any, index) => {
          let obj: Book | any = {
            'bookId': book[1].bookId,
            'name': book[1].name,
            'startDate': this.datePipe.transform(book[1].startDate, 'yyyy-MM-dd'),
            'endDate': this.datePipe.transform(book[1].endDate, 'yyyy-MM-dd'),
            'totalPage': book[1].totalPage,
            'author': book[1].author,
            'bookType': book[1].bookType,
            'readPage': book[1].readPage

          }
          // if (obj.endDate) {
          this.books.push(obj);
          // }
          this.dataSource = new MatTableDataSource<Book>(this.books);
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

  // ===============DELETE / UPDATE book-form==============  
  getTheBook(book: any): FormGroup {
    //to fill the form
    return this.bookManipulateForm = this.fb.group({
      bookId: [book.bookId, Validators.required],
      bookname: [book.name, Validators.required],
      numberofpages: [book.totalPage, Validators.required],
      authorname: [book.author, Validators.required],
      startdate: [book.startDate, Validators.required],
      enddate: [book.endDate, Validators.required],
      booktype: [book.bookType, Validators.required],
      readpage: [book.readPage, Validators.required]
    });
  }


  deleteBook() {
    this.bookservice.deleteBook(this.bookManipulateForm.get('bookId')?.value).subscribe({
      next: (response) => { },
      error: (err) => {
        console.log(err.message)
        this.deleteToken();
      },
      complete: () => { this.retrieveBooks(); }
    })
  }
  async updateBook() {

    const bookname = this.bookManipulateForm.get('bookname')?.value;
    const pages: number = this.bookManipulateForm.get('numberofpages')?.value;
    const startdate: Date = this.bookManipulateForm.get('startdate')?.value;
    const booktype = this.bookManipulateForm.get('booktype')?.value;
    const enddate: Date = this.bookManipulateForm.get('enddate')?.value;
    const readpage: number = this.bookManipulateForm.get('readpage')?.value;
    const author = this.bookManipulateForm.get('authorname')?.value;
    const bookId = this.bookManipulateForm.get('bookId')?.value;


    const book = await new Book(bookname, pages, startdate, booktype, enddate, readpage, author, bookId)

    if (readpage > pages || readpage <= 0) {
      this.alertsservice.alert('Invalid value(s)!', 'alert-danger', this.alertParent.nativeElement);
    }
    else if (enddate != null && startdate > enddate) {
      // if (enddate < startdate) {
      this.alertsservice.alert('Invalid value(s)!', 'alert-danger', this.alertParent.nativeElement);
      // }
    }
    else {
      await this.bookservice.updateBook(book).subscribe({
        next: async (response) => {
          const alertUpdate: Element | any = document.getElementById('update_delete_book');
          alertUpdate.style.display = 'none';
          await this.retrieveBooks();

        },
        error: (err) => { console.log(err.message); this.deleteToken() }
      })
    }
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }
}
