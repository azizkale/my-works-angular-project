import { Component, OnInit } from '@angular/core';
import { HatimService } from 'src/app/services/hatim.service';
import { cuz } from 'src/models/cuz';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hatim',
  templateUrl: './hatim.component.html',
  styleUrls: ['./hatim.component.css']
})

export class HatimComponent implements OnInit {
  cuzs: cuz[] = [];
  name: string | any = localStorage.getItem('displayName');

  constructor(
    private hatimservice: HatimService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCuzs();

    // this.hatimservice.createHatim().subscribe({ next: () => { } })
  }

  getCuzs() {
    this.hatimservice.retrieveHatim().subscribe({
      next: (response) => {
        console.log(response)
        Object.values(response['cuzs']).map((cuz: any) => {
          if (cuz !== null)
            this.cuzs.push(cuz)
        })
      },
      error: (err) => {
      },
      complete: () => {
      }
    })
  }

  selectCuz(cuz: cuz, index: number) {
    //if the cuz is not being read
    if (cuz.beingRead == false && cuz.complete == false) {
      cuz.reader = this.name;
      cuz.beingRead = true
      this.hatimservice.updateHatim(cuz, +index).subscribe({
        next: (response: cuz) => {
          console.log(response)
        }
      })
    }
    else {
      this.hatimAlert();
    }

  }
  hatimAlert() {
    this._snackBar.open('Bu cüz alınmıştır!', '', {
      duration: 200 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['cuz']
    });
  }
}