import { Component, OnInit } from '@angular/core';
import { HatimService } from 'src/app/services/hatim.service';
import { cuz } from 'src/models/cuz';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from 'src/app/services/roles.service';
import { Roles } from 'src/models/Roles';

@Component({
  selector: 'app-hatim',
  templateUrl: './hatim.component.html',
  styleUrls: ['./hatim.component.css']
})

export class HatimComponent implements OnInit {
  cuzs: cuz[] | any = [];
  hatimCount: number;
  uid: string | any = localStorage.getItem('uid');
  name: string | any;
  groupId: any = localStorage.getItem('groupId')
  innerWidth = window.innerWidth;
  allowToAdmin: boolean = this.rolesservice.checkRole(Roles[1])

  constructor(
    private hatimservice: HatimService,
    private _snackBar: MatSnackBar,
    private rolesservice: RolesService
  ) { }

  ngOnInit(): void {
    this.retrieveCuzs();
    this.readerName();
  }
  retrieveCuzs() {
    this.cuzs = []
    this.hatimservice.retrieveHatim(this.groupId).subscribe({
      next: (response) => {
        //data comes from db with a null object (cuzs[0] = null)
        Object.values(response['cuzs']).map((cuz: cuz | any) => {
          if (cuz !== null) {
            this.cuzs.push(cuz)
          }
        })
        this.hatimCount = response['totalHatim'].totalHatim
      },
      error: (err) => {

      },
      complete: () => {
      }
    })
  }

  hatimAlert() {
    this._snackBar.open(`Bu cüz alınmıştır!`, 'X', {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['cuz']
    });
  }

  readerName(): string | any {
    this.hatimservice.getReaderName().subscribe({
      next: async (ress) => {
        this.name = await ress.name
      }
    })
    return this.name;
  }

  getCuz(cuz: cuz) {
    this.hatimservice.getSingleCuz(cuz.cuzname, this.groupId).subscribe({
      next: async (response: any) => {
        console.log(response)
        let cuz_fromDB = response['cuz'];
        if (cuz_fromDB.reader === '' && cuz_fromDB.beingRead === false && cuz_fromDB.complete === false) {
          cuz.reader = this.uid;
          cuz.beingRead = true
          this.hatimservice.updateHatim(cuz, cuz.cuzname, this.groupId).subscribe({
            next: (response: cuz) => {
              console.log(response)
            }
          })
        }
        else
          this.hatimAlert()
      }
    })

  }

  leaveCuz(cuz: cuz, index: number) {
    if (cuz.reader !== '' && cuz.reader === this.uid) {
      cuz.beingRead = false;
      cuz.complete = false;
      cuz.reader = '';
      this.hatimservice.updateHatim(cuz, index + 1, this.groupId).subscribe({
        next: (data) => { }
      })
    }
    else this.hatimAlert()

  }

  completeCuz(cuz: cuz, index: number) {
    cuz.beingRead = true;
    cuz.complete = true;
    this.hatimservice.updateHatim(cuz, index + 1, this.groupId).subscribe({
      next: (data) => { }
    })
  }

  style_Cuz(cuz: cuz) {
    return {
      'background-color':
        cuz.beingRead === true && cuz.complete === true
          ? 'green'
          : cuz.beingRead === true && cuz.complete === false
            ? 'orange'
            : cuz.beingRead === false && cuz.complete === false
              ? 'white'
              : 'transparent'
    }
  }

  //to show reader of cuz which another users got
  // getReaderName(uid: any): string | any {
  //   let readerName = ''
  //   this.hatimservice.getNameOfAntoherUsers(uid).subscribe({
  //     next: (ress) => {
  //       readerName = ress.readername
  //     }
  //   }
  //   )
  //   return readerName
  // }

  resetHatim() {
    this.hatimservice.createHatim(this.groupId).subscribe({ next: (res) => { } })
    this.retrieveCuzs();
  }
}

