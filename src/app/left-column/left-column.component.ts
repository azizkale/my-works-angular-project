import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.css']
})
export class LeftColumnComponent implements OnInit {
  displayName: string | any = localStorage.getItem('displayName');
  photoURL: string | any = localStorage.getItem('photoURL')

  ngOnInit(): void {
  }

}
