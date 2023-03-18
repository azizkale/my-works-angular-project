import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  @ViewChild('rightSide', { static: true }) rightSide: ElementRef

  books: any;
  displayName: string | any = localStorage.getItem('displayName');

  constructor(private router: Router, private bookservice: BookService) {
  }

  ngOnInit(): void {
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
  w3_close(mySidebar: HTMLElement, myOverlay: HTMLElement) {
    mySidebar.style.display = "none";
    myOverlay.style.display = "none";
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigate(['signin']);

  }
  reload() {
    window.location.reload()
  }
  showGroupsComponentsTemplate() {
    this.rightSide.nativeElement.innerHTML = `<app-grouplist></app-grouplist>`
  }
}
