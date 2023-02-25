import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/models/Book";
import { BookType } from "src/models/BookTypes";

@Component({
  selector: 'app-booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css']
})
export class BooktableComponent implements OnInit {
  dataSource = [
    { id: 1, name: "Angular", price: "45.00" },
    { id: 2, name: "React Js", price: "30.00" },
    { id: 3, name: "Vue Js", price: "20.00" }
  ];
  bookForm: FormGroup;
  books: any
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bookservice: BookService) {
    this.createBookForm();
  }

  ngOnInit(): void {
    this.retrieveBooks()
  }
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
        this.books = res;
        console.log(res)
      },
      error: async (err) => {
        //unvalid token
        if (err.status === 401) {
          await this.deleteToken();
        }
      }
    })
  }

  retrieveBooks() {
    this.bookservice.retrieveBooks().subscribe({
      next: (response) => {
        this.books = Object.entries(response);
        console.log(this.books)
      }
    })
  }
  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
  }
}
