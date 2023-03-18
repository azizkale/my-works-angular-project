import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  displayName: string | any = localStorage.getItem('displayName');

  constructor(private router: Router, private bookservice: BookService) {
  }

  ngOnInit(): void {
  }
  // Toggle between showing and hiding the sidebar, and add overlay effect

}
