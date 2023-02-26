import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/models/Book';
import { BookType } from 'src/models/BookTypes';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  position: number;
  Name: string;
  Start: Date | any;
  Finish: Date | any;
  Page: number;
  Author: string
}

@Component({
  selector: 'booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})

export class BooklistComponent implements OnInit {
  bookForm: FormGroup; // add book form
  displayedColumns: string[] = ['position', 'Name', 'Start', 'Finish', 'Page', 'Author'];
  dataSource: MatTableDataSource<PeriodicElement>;
  books: any = [];

  constructor(
    private fb: FormBuilder,
    private bookservice: BookService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.createBookForm();

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
            'position': index + 1,
            'Name': book[1].name,
            'Start': this.datePipe.transform(book[1].startDate, 'yyyy-MM-dd'),
            'Finish': this.datePipe.transform(book[1].finisDate, 'yyyy-MM-dd'),
            'Page': book[1].totalPage,
            'Author': book[1].author,

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
  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }

}
