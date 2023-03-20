import { Component, OnInit } from '@angular/core';
import { cuz } from 'src/models/cuz';

@Component({
  selector: 'app-hatim',
  templateUrl: './hatim.component.html',
  styleUrls: ['./hatim.component.css']
})
export class HatimComponent implements OnInit {
  cuzs: [cuz];


  constructor() { }

  ngOnInit(): void {
  }

}
