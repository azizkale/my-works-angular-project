import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PireditService } from 'src/app/services/piredit.service';
import { UserService } from 'src/app/services/user.service';
import { Chapter } from 'src/models/Chapter';
import { Roles } from 'src/models/Roles';
import { WordPair } from 'src/models/WordPair';

@Component({
  selector: 'app-chapteredit',
  templateUrl: './chapteredit.component.html',
  styleUrls: ['./chapteredit.component.css'],
})
export class ChaptereditComponent implements OnInit {
  retrieveChapterForm: FormGroup;
  createChapterForm: FormGroup;
  updateChapterForm: FormGroup;
  addWordForm: FormGroup;
  chapters: Chapter[];
  roles = JSON.parse(localStorage.getItem('roles')!.toString())
  allowedToAdmin: boolean = this.roles.includes(Roles[1])
  selectedPirId: any;
  selectedWord: any; // to edit word on chapter update form
  users: any[] = [] // fullfilling the select tag on FormGroup
  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService,
    private activeroute: ActivatedRoute,
    public userservice: UserService

  ) { }

  ngOnInit(): void {
    this.selectedPirId = this.activeroute.snapshot.paramMap.get('id');
    this.retrieveChaptersByEditorId();
    this.createChapterRetrieveForm()
    this.createNewChapterForm();
    this.createUpdateChapterForm();
    this.createAddWordPairForm();
  }

  createChapterRetrieveForm() {
    this.retrieveChapterForm = this.fb.group({
      chapterId: ['', Validators.required],
      pirId: ['', Validators.required],
      editorId: ['', Validators.required],
      createDate: ['', Validators.required],
      chapterContent: ['', Validators.required],
    });
  }

  createNewChapterForm() {
    this.createChapterForm = this.fb.group({
      chapterName: ['', Validators.required],
      chapterContent: ['', Validators.required],
      selectEditor: ['', Validators.required]
    });

    // fullfilling the select tag on FormGroup
    this.users = []
    this.userservice.getAllUsers().subscribe({
      next: (ress: any) => {
        ress.forEach((user: any) => {
          this.users.push(user)
          this.createChapterForm.addControl(ress.uid, new FormControl(user.uid));
        });
      }
    })
  }

  createAddWordPairForm() {
    this.addWordForm = this.fb.group({
      word: ['', Validators.required],
      meaning: ['', Validators.required]
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
    const editorId = this.createChapterForm.get('selectEditor')?.value;
    console.log(editorId)
    //chapterId will be given in server-side
    const chapter = new Chapter(chapterName, chapterContent, null, editorId, this.selectedPirId, new Date(), [])
    this.pireditservice.addChapter(chapter).subscribe({
      next: (ress) => {
        console.log(ress)
      },
      complete: () => {
        this.retrieveChaptersByEditorId();
      }
    })
  }

  deleteChapter() {
    this.pireditservice.deleteChapter(this.selectedPirId, this.updateChapterForm.get('chapterId')?.value).subscribe({
      next: (ress) => {
        this.retrieveChaptersByEditorId()
        this.createChapterRetrieveForm()
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

  saveWordPair(meaning: string) {
    const wordPair = new WordPair(
      this.selectedWord,
      meaning,
      this.updateChapterForm.get('chapterId')?.value,
      this.updateChapterForm.get('pirId')?.value, localStorage.getItem('uid'))

    //making the selected word and
    this.updateChapterForm.get('chapterContent')?.patchValue(
      this.makeBold(this.updateChapterForm.get('chapterContent')?.value, this.selectedWord))

    //creating wordpair
    this.pireditservice.createWordPair(wordPair).subscribe({
      next: (ress) => {
        console.log(ress)
        this.updateChapter(); // to save (as updated) the word that made bold
      }, complete: () => {
        this.createAddWordPairForm();// to clear the form
        this.retrieveChaptersByEditorId();
      }
    })

  }

  makeBold(text: string, changingWord: string): string {
    const regex = new RegExp(`\\b${this.selectedWord}\\b`, "gi");
    text = text.replace(changingWord.trim(), `<b>${changingWord.trim()}</b>`);
    return text
  }
}