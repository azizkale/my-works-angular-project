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
  pirEditForm: FormGroup;
  addNewPirForm: FormGroup;
  retrievePirForm: FormGroup;
  pirs: Pir[]

  roles = JSON.parse(localStorage.getItem('roles')!.toString())
  allowedToAdmin: boolean = this.roles.includes(Roles[1])
  showChapterEditPage: boolean;
  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService

  ) { }

  ngOnInit(): void {
    this.showChapterEditPage = false
    this.pirs = [
      { name: 'pir1', description: 'decription-1', chapters: [], editorId: 'mentorId-1', pirId: 'pirId-1' },
      { name: 'pir2', description: 'decription-2', chapters: [], editorId: 'mentorId-2', pirId: 'pirId-2' },]
    this.createPirEditForm();
    this.createNewPirForm();
    this.createPirRetrieveForm();
  }

  createPirEditForm() {
    this.pirEditForm = this.fb.group({
      pirName: ['', Validators.required],
      bookChapterNames: this.fb.array([]),
      bookChapterContents: [this.fb.control([]), Validators.required]
    });

    // this.chapters.forEach((chapter, index) => {
    //   this.pirEditForm.addControl('chapterName-' + index, new FormControl(chapter.chapterName));
    //   this.pirEditForm.addControl('chapterContent-' + index, new FormControl(chapter.chapterContent));
    // });

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

    this.pirs.forEach((pir, index) => {
      this.retrievePirForm.addControl(pir.name, new FormControl(pir.name));
    });
  }




  async addNewPir() {
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
        console.log(ress);
      }
    })
    this.createNewPirForm();
  }

}
