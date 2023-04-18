import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PireditService } from 'src/app/services/piredit.service';
import { Chapter } from 'src/models/Chapter';
import { Roles } from 'src/models/Roles';

@Component({
  selector: 'app-chapteredit',
  templateUrl: './chapteredit.component.html',
  styleUrls: ['./chapteredit.component.css']
})
export class ChaptereditComponent implements OnInit {
  retrieveChapterForm: FormGroup;
  chapters: Chapter[];
  addingChapterForm: FormGroup;
  roles = JSON.parse(localStorage.getItem('roles')!.toString())
  allowedToAdmin: boolean = this.roles.includes(Roles[1])
  selectedPirId: any;

  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService,
    private activeroute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.selectedPirId = this.activeroute.snapshot.paramMap.get('id');

    this.chapters = [
      { chapterName: 'chapter-1', chapterContent: 'chapter-content1', chapterId: 'chapterId-1', editorId: '', pirId: '', createDate: new Date() },
      { chapterName: 'chapter-2', chapterContent: 'chapter-content2', chapterId: 'chapterId-2', editorId: '', pirId: '', createDate: new Date() },
    ]
    this.createChapterRetrieveForm();
    this.createNewChapterForm();

  }
  createChapterRetrieveForm() {
    this.retrieveChapterForm = this.fb.group({
      chapterName: this.fb.array([]),
    });
    this.chapters.forEach((chapter, index) => {
      this.retrieveChapterForm.addControl(chapter.chapterName, new FormControl(chapter.chapterName));
    });
  }
  createNewChapterForm() {
    this.addingChapterForm = this.fb.group({
      chapterName: ['', Validators.required],
      chapterContent: ['', Validators.required]
    });
  }
  addChapter(chapterName: string, chapterContent: string) {
    const editorId = localStorage.getItem('uid');
    //chapterId will be given in service
    const chapter = new Chapter(chapterName, chapterContent, null, editorId, this.selectedPirId, new Date())

    this.pireditservice.addChapter(chapter).subscribe({
      next: (ress) => {
        console.log(ress)
      }
    })
  }
}
