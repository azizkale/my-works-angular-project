import { Component, OnInit } from '@angular/core';
import { ShbService } from 'src/app/services/shb.service';
import { SHB } from 'src/models/shb';

@Component({
  selector: 'app-shb',
  templateUrl: './shb.component.html',
  styleUrls: ['./shb.component.css']
})
export class ShbComponent implements OnInit {
  shbName: string;
  photoURL: string;
  constructor(
    private shbservice: ShbService
  ) { }

  ngOnInit(): void {
  }
  createShb() {
    this.shbservice.createShb(new SHB('hz. ali', 212121, new Date(), [], [])).subscribe({
      next: (ress) => {
        console.log(ress)
      }
    })
  }
}
