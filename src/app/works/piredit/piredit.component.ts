import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PireditService } from 'src/app/services/piredit.service';
import { Chapter } from 'src/models/Chapter';
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

  roles = JSON.parse(localStorage.getItem('roles')!.toString())
  allowedToAdmin: boolean = this.roles.includes(Roles[1])

  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService

  ) { }

  ngOnInit(): void {
    this.retrievePirs()
    this.createPirRetrieveForm()
    this.createNewPirForm()
    this.createUpdatePirForm();
  }

  createNewPirForm() {
    this.addNewPirForm = this.fb.group({
      pirName: ['', Validators.required],
      preface: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createPirRetrieveForm() {
    this.retrievePirForm = this.fb.group({
      pirName: this.fb.array([]),
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
  async createNewPir() {
    const chapter = new Chapter('önsöz', this.addNewPirForm.get('preface')?.value, null, localStorage.getItem('uid'), null, new Date())
    const newPir = new Pir(
      null,
      localStorage.getItem('uid'),
      this.addNewPirForm.get('pirName')?.value,
      this.addNewPirForm.get('description')?.value,
      [chapter]
    )
    this.pireditservice.createPir(newPir).subscribe({
      next: (ress) => {
      }
    })
    this.createNewPirForm();
  }

  retrievePirs() {
    this.pirs = []
    this.pireditservice.retrievePirs().subscribe({
      next: async (ress) => {
        if (ress) {
          await Object.values(ress).map((pir: Pir | any) => {
            this.pirs.push(pir)
          })
          this.pirs.forEach((pir, index) => {
            this.retrievePirForm.addControl(pir.name, new FormControl(pir.name));
          });
        }
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
}
