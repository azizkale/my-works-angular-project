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
  addingChapterForm: FormGroup;
  addNewPirForm: FormGroup;
  retrievePirForm: FormGroup;
  retrieveChapterForm: FormGroup;


  roles = JSON.parse(localStorage.getItem('roles')!.toString())
  allowedToAdmin: boolean = this.roles.includes(Roles[1])

  chapters: Chapter[] = [
    { chapterName: 'chapter-1', chapterContent: 'chapter-content1' },
    { chapterName: 'chapter-2', chapterContent: 'chapter-content2' },
    { chapterName: 'chapter-3', chapterContent: 'chapter-content3' }
  ]
  pirs: Pir[] = [
    { name: 'pir1', description: 'decription-1', chapter: this.chapters[0], editorId: 'mentorId-1', pirId: 'pirId-1' },
    { name: 'pir2', description: 'decription-2', chapter: this.chapters[1], editorId: 'mentorId-2', pirId: 'pirId-2' },]

  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService

  ) { }

  ngOnInit(): void {
    this.createPirEditForm();
    this.createNewChapterForm();
    this.createNewPirForm();
    this.createPirRetrieveForm();
    this.createChapterRetrieveForm();
  }

  createPirEditForm() {
    this.pirEditForm = this.fb.group({
      pirName: ['', Validators.required],
      bookChapterNames: this.fb.array([]),
      bookChapterContents: [this.fb.control([]), Validators.required]
    });

    this.chapters.forEach((chapter, index) => {
      this.pirEditForm.addControl('chapterName-' + index, new FormControl(chapter.chapterName));
      this.pirEditForm.addControl('chapterContent-' + index, new FormControl(chapter.chapterContent));
    });

  }

  createNewChapterForm() {
    this.addingChapterForm = this.fb.group({
      chapterName: ['', Validators.required],
      chapterContent: ['', Validators.required]
    });
  }

  createNewPirForm() {
    this.addNewPirForm = this.fb.group({
      pirName: ['', Validators.required],
      preface: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createChapterRetrieveForm() {
    // this.retrieveChapterForm = this.fb.group({
    //   pirName: this.fb.array([]),
    // });
    // this.chapters.forEach((chapter, index) => {
    //   this.retrievePirForm.addControl('chapterName-' + index, new FormControl(chapter.chapterName));
    // });
  }

  createPirRetrieveForm() {
    this.retrievePirForm = this.fb.group({
      pirName: this.fb.array([]),
    });

    this.pirs.forEach((pir, index) => {
      this.retrievePirForm.addControl(pir.name, new FormControl(pir.name));
    });
  }

  addChapter(chapterName: string, chapterContent: string, pirId: any) {
    const chapter = new Chapter(chapterName, chapterContent)

    this.pireditservice.addChapter(chapter, pirId)
  }



  async addNewPir() {
    const chapter = new Chapter('önsöz', this.addNewPirForm.get('preface')?.value)
    const newPir = await new Pir(
      localStorage.getItem('uid'),
      this.addNewPirForm.get('pirName')?.value,
      this.addNewPirForm.get('description')?.value,
      chapter
    )
    await this.pireditservice.createPir(newPir).subscribe({
      next: (ress) => {
        console.log(ress)
      }
    })
    await this.createNewPirForm();
  }

}
