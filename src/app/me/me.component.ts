import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  displayName: string | any = localStorage.getItem('displayName');
  constructor() {
  }

  ngOnInit(): void {
  }


}
