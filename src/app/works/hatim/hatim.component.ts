import { Component, OnInit } from '@angular/core';
import { HatimService } from 'src/app/services/hatim.service';
import { cuz } from 'src/models/cuz';

@Component({
  selector: 'app-hatim',
  templateUrl: './hatim.component.html',
  styleUrls: ['./hatim.component.css']
})
export class HatimComponent implements OnInit {
  cuzs: cuz[] = [];
  name: string | any = localStorage.getItem('displayName');

  constructor(private hatimservice: HatimService) { }

  ngOnInit(): void {
    this.hatimservice.retrieveHatim().subscribe({
      next: (response) => {
        Object.values(response['cuzs']).map((cuz: any) => {
          this.cuzs.push(cuz)
        })
      },
      error: (err) => {

      }
    })
  }

}
