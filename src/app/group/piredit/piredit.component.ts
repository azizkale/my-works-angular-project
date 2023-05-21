import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PireditService } from 'src/app/services/piredit.service';
import { RolesService } from 'src/app/services/roles.service';
import { Pir } from 'src/models/Pir';
import { Roles } from 'src/models/Roles';

@Component({
  selector: 'app-piredit',
  templateUrl: './piredit.component.html',
  styleUrls: ['./piredit.component.css']
})
export class PireditComponent implements OnInit {
  addNewPirForm: FormGroup;
  retrievePirForm: FormGroup;
  updatePirForm: FormGroup;
  pirs: Pir[] = [];
  userId = localStorage.getItem('uid') // to determine user is allowed to edit pir

  allowedToAdminAndPirEditor: boolean;
  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService,
    private roleservice: RolesService

  ) {
    this.roleservice.getUserRoles(localStorage.getItem('uid')).subscribe({
      next: (roles) => {
        console.log(roles)
        this.allowedToAdminAndPirEditor = roles.includes(Roles[1]) || roles.includes(Roles[4])
      }
    })
  }

  ngOnInit(): void {
    this.retrievePirs()
    this.createPirRetrieveForm()
    this.createNewPirForm()
    this.createUpdatePirForm();
    this.retrievePirList();
  }

  createNewPirForm() {
    this.addNewPirForm = this.fb.group({
      pirName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createPirRetrieveForm() {
    this.retrievePirForm = this.fb.group({
    });
    //formname array is fullfilled in the retrievePirs function (below)

  }

  createUpdatePirForm() {
    this.updatePirForm = this.fb.group({
      pirId: ['', Validators.required],
      editorId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createNewPir() {
    // const chapter = new Chapter('önsöz', this.addNewPirForm.get('preface')?.value, null, localStorage.getItem('uid'), null, new Date(), [])
    // const newPir = new Pir(
    //   null,
    //   localStorage.getItem('uid'),
    //   this.addNewPirForm.get('pirName')?.value,
    //   this.addNewPirForm.get('description')?.value,
    //   [],
    //   []
    // )
    // this.pireditservice.createPir(newPir).subscribe({
    //   next: (ress) => {
    //     this.retrievePirs()
    //     this.createPirRetrieveForm()
    //   }
    // })
  }

  asignPirToMentorToEdit() {
    const newPir = new Pir(
      this.addNewPirForm.get('pirId')?.value,
      localStorage.getItem('uid'),
      '',
      this.addNewPirForm.get('pirName')?.value,
      this.addNewPirForm.get('description')?.value,
      [],
      []
    )
    this.pireditservice.createPir(newPir).subscribe({
      next: (ress) => {
        this.retrievePirs()
        this.createPirRetrieveForm()
      }
    })
  }

  retrievePirs() {
    this.pirs = []
    this.pireditservice.retrievePirListToEditNewPir().subscribe({
      next: async (ress) => {
        if (ress) {
          await Object.values(ress).map((pir: Pir | any) => {
            this.pirs.push(pir)
          })
          this.pirs.forEach((pir, index) => {
            this.retrievePirForm.addControl(pir.name, new FormControl(pir.name));
          });
        }
      }, complete: () => {

      }
    })
    // this.pireditservice.retrievePirs().subscribe({
    //   next: async (ress) => {
    //     if (ress) {
    //       await Object.values(ress).map((pir: Pir | any) => {
    //         this.pirs.push(pir)
    //       })
    //       this.pirs.forEach((pir, index) => {
    //         this.retrievePirForm.addControl(pir.name, new FormControl(pir.name));
    //       });
    //     }
    //   }, complete: () => {

    //   }
    // })
  }

  retrievePirList() {
    this.pireditservice.retrievePirListToEditNewPir().subscribe({
      next: (pirlist) => {
        console.log(pirlist)
      }
    })
  }

  selectPir(pir: Pir) {
    this.updatePirForm = this.fb.group({
      pirId: [pir.pirId, Validators.required],
      editorId: [pir.editorId, Validators.required],
      name: [pir.name, Validators.required],
      description: [pir.description, Validators.required]
    });
  }

  updatePir() {
    this.pireditservice.updatePir(this.updatePirForm.value).subscribe({
      next: (ress) => { this.retrievePirs() }
    })
  }

  deletePir() {
    this.pireditservice.deletePir(this.updatePirForm.get('pirId')?.value).subscribe({
      next: (ress) => {
        this.retrievePirs()
        this.createPirRetrieveForm()
        console.log(ress)
      }
    })
  }
}
