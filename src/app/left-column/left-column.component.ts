import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.css']
})
export class LeftColumnComponent implements OnInit {
  displayName: string | any = localStorage.getItem('displayName');
  photoURL: string | any;

  ngOnInit(): void {
    this.photoURL = (localStorage.getItem('photoURL') !== undefined ? 'https://www.w3schools.com/w3css/img_avatar3.png' : localStorage.getItem('photoURL'))
  }

}
