import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";
@Component({
  selector: 'booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.css']
})

export class BooktableComponent implements OnInit {

  books: any
  constructor(
    private router: Router,
    private bookservice: BookService) {
  }

  ngOnInit(): void {
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

}
