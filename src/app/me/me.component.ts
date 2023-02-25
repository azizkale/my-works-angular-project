import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/models/Book';
import { BookType } from 'src/models/BookTypes';
import { BookService } from '../services/book.service';

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  bookForm: FormGroup;
  books: [Book]
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bookservice: BookService) {
    this.createBookForm();
  }

  ngOnInit(): void {

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
    this.bookservice.retrieveBooks().subscribe((response) => {
      console.log(response)
    })
  }
  // Toggle between showing and hiding the sidebar, and add overlay effect
  w3_open(mySidebar: any, myOverlay: any) {
    if (mySidebar.style.display === "block") {
      mySidebar.style.display = "none";
      myOverlay.style.display = "none";
    } else {
      mySidebar.style.display = "block";
      myOverlay.style.display = "block";
    }
  }
  // Close the sidebar with the close button
  w3_close(mySidebar: any, myOverlay: any) {
    mySidebar.style.display = "none";
    myOverlay.style.display = "none";
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }
}
