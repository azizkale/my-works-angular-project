import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  bookForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createBookForm()
  }

  ngOnInit(): void {
  }

  createBookForm() {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      numberofpage: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  createBook(bookname: string, numberofpage: Number, author?: string) {

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
