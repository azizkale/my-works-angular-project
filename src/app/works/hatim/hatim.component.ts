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


  constructor(private hatimservice: HatimService) { }

  ngOnInit(): void {
    this.hatimservice.retrieveHatim().subscribe({
      next: (response) => {
        console.log(response)
        Object.values(response['cuzs']).map((cuz: any) => {
          console.log(cuz)
          this.cuzs.push(cuz)
        })

        // response[0].map((elm: cuz) => { console.log(elm) })



      },
      error: (err) => {

      }
    })
  }

}
