import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PireditService } from 'src/app/services/piredit.service';
import { Pir } from 'src/models/Pir';

@Component({
  selector: 'app-piredit',
  templateUrl: './piredit.component.html',
  styleUrls: ['./piredit.component.css']
})
export class PireditComponent implements OnInit {
  pirEditForm: FormGroup
  chapters = [
    { chapterName: 'chapter-1', chapterContent: 'chapter-content1' },
    { chapterName: 'chapter-2', chapterContent: 'chapter-content2' },
    { chapterName: 'chapter-3', chapterContent: 'chapter-content3' }
  ]
  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService

  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
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


  addChapter() {

  }
}
