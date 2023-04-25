import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PireditService } from 'src/app/services/piredit.service';
import { Chapter } from 'src/models/Chapter';
import { Roles } from 'src/models/Roles';
import { WordPair } from 'src/models/WordPair';

@Component({
  selector: 'app-chapteredit',
  templateUrl: './chapteredit.component.html',
  styleUrls: ['./chapteredit.component.css'],
})
export class ChaptereditComponent implements OnInit {
  @ViewChild('editWord') editWord: ElementRef
  retrieveChapterForm: FormGroup;
  createChapterForm: FormGroup;
  updateChapterForm: FormGroup;
  editWordForm: FormGroup;
  chapters: Chapter[];
  roles = JSON.parse(localStorage.getItem('roles')!.toString())
  allowedToAdmin: boolean = this.roles.includes(Roles[1])
  selectedPirId: any;
  selectedWord: any; // to edit word on chapter update form

  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService,
    private activeroute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.selectedPirId = this.activeroute.snapshot.paramMap.get('id');
    this.retrieveChaptersByEditorId();
    this.createChapterRetrieveForm()
    this.createNewChapterForm();
    this.createUpdateChapterForm();
    this.createWordEditForm();
  }

  createChapterRetrieveForm() {
    this.retrieveChapterForm = this.fb.group({
      chapterId: ['', Validators.required],
      pirId: ['', Validators.required],
      editorId: ['', Validators.required],
      createDate: ['', Validators.required],
      chapterContent: ['', Validators.required],
      chapterName: this.fb.array([])
    });
  }
  createNewChapterForm() {
    this.createChapterForm = this.fb.group({
      chapterName: ['', Validators.required],
      chapterContent: ['', Validators.required]
    });
  }

  createWordEditForm() {
    this.editWordForm = this.fb.group({
      wordEdit: ['', Validators.required]
    });
  }

  createUpdateChapterForm() {
    this.updateChapterForm = this.fb.group({
      chapterId: ['', Validators.required],
      chapterName: ['', Validators.required],
      chapterContent: ['', Validators.required]
    });
  }

  addChapter(chapterName: string, chapterContent: string) {
    const editorId = localStorage.getItem('uid');
    //chapterId will be given in service
    const chapter = new Chapter(chapterName, chapterContent, null, editorId, this.selectedPirId, new Date(), [])

    this.pireditservice.addChapter(chapter).subscribe({
      next: (ress) => {
        console.log(ress)
      }
    })
  }

  retrieveChaptersByEditorId() {
    const editorId = localStorage.getItem('uid');
    this.pireditservice.retrieveChaptersByEditorId(editorId, this.selectedPirId).subscribe({
      next: (ress) => {
        this.chapters = ress;
        this.chapters.forEach((chapter, index) => {
          this.retrieveChapterForm.addControl(chapter.chapterName, new FormControl(chapter.chapterName));
        });
      }
    })
  }

  selectChapter(chapter: Chapter) {
    this.updateChapterForm = this.fb.group({
      chapterId: [chapter.chapterId],
      chapterName: [chapter.chapterName, Validators.required],
      chapterContent: [chapter.chapterContent, Validators.required],
      pirId: [chapter.pirId, Validators.required],
      editorId: [chapter.editorId, Validators.required],
      createDate: [chapter.createDate, Validators.required],
    });
  }

  updateChapter() {
    this.pireditservice.updateChapter(this.updateChapterForm.value).subscribe({
      next: (ress) => { this.retrieveChaptersByEditorId() }
    })
  }

  selectTextToManipulate() {
    const selection: any = window.getSelection();
    this.selectedWord = selection.toString();
  }

  showWordEditForm() {
    this.editWord.nativeElement.style.display = 'block'
  }

  saveWordPair(meaning: string) {
    const wordPair = new WordPair(this.selectedWord, meaning, this.updateChapterForm.get('chapterId')?.value, this.updateChapterForm.get('pirId')?.value, localStorage.getItem('uid'))
    this.pireditservice.createEditedWordPair(wordPair).subscribe({
      next: (ress) => {
        console.log(ress)

        // console.log(this.updateChapterForm.get('chapterContent')?.value)
        // const regex = new RegExp(this.selectedWord, 'g');
        // const newText = this.updateChapterForm.get('chapterContent')?.value.replace(regex, meaning);

        // console.log(newText);

      }
    })
    this.createWordEditForm();
  }
}