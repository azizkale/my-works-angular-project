import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
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
    this.bookservice.retrieveBooks().subscribe({
      next: async (response) => {
        this.books = await Object.entries(response);
      },
      error: (err) => {
        if (err.status === 401) {
          this.deleteToken();
        }
      }
    })
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }
}
