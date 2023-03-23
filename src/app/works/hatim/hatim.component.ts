import { Component, OnInit } from '@angular/core';
import { HatimService } from 'src/app/services/hatim.service';
import { cuz } from 'src/models/cuz';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hatim',
  templateUrl: './hatim.component.html',
  styleUrls: ['./hatim.component.css']
})

export class HatimComponent implements OnInit {
  cuzs: cuz[] = [];
  name: string | any = localStorage.getItem('displayName');
  innerWidth = window.innerWidth;

  constructor(
    private hatimservice: HatimService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.retrieveCuzs();

    // this.hatimservice.createHatim().subscribe({ next: () => { } })
  }

  retrieveCuzs() {
    this.hatimservice.retrieveHatim().subscribe({
      next: (response) => {
        console.log(response)
        Object.values(response['cuzs']).map((cuz: any) => {
          if (cuz !== null)
            this.cuzs.push(cuz)
        })
      },
      error: (err) => {
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['signin']);
        }
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
    //if the reader click his (being read) cuz clicks
    if (cuz.reader === this.name) {

    }
    else {
      this.hatimAlert(cuz.reader);
    }

  }
  hatimAlert(reader: string | any) {
    this._snackBar.open(`Bu cüz ${reader} tarafindan alınmıştır!`, 'X', {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['cuz']
    });
  }
}