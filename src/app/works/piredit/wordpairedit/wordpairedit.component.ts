import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PireditService } from 'src/app/services/piredit.service';
import { UserService } from 'src/app/services/user.service';
import { Chapter } from 'src/models/Chapter';
import { User } from 'src/models/User';
import { WordPair } from 'src/models/WordPair';

@Component({
  selector: 'wordpairedit',
  templateUrl: './wordpairedit.component.html',
  styleUrls: ['./wordpairedit.component.css']
})
export class WordpaireditComponent implements OnInit {
  @Input() pirId: any
  wordPairs: WordPair[] = []
  retrieveWordPairs: FormGroup
  editWordPairForm: FormGroup;
  displayName: string

  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.retrieveChaptersByEditorId()
    this.retrieveWordPairEditForm()
    this.createEditWordPairForm();
  }

  retrieveWordPairEditForm() {
    this.retrieveWordPairs = this.fb.group({
      word: ['', Validators.required],
      mean: ['', Validators.required]
    });
  }

  retrieveChaptersByEditorId() {
    const editorId = localStorage.getItem('uid');
    this.pireditservice.retrieveChaptersByEditorId(editorId, this.pirId).subscribe({
      next: (chapters: Chapter[]) => {
        chapters.map((chapter: Chapter) => {
          if (chapter.wordPairs) {
            Object.values(chapter.wordPairs).map((wordpair: WordPair) => {
              this.wordPairs.push(wordpair)
            })
          }
        })
      }, complete: () => { console.log(this.wordPairs) }
    })
  }

  createEditWordPairForm() {
    this.editWordPairForm = this.fb.group({
      word: ['', Validators.required],
      mean: ['', Validators.required]
    });
  }

  getWordPairToEdit(selectedWordPair: WordPair) {
    this.editWordPairForm.patchValue({
      word: selectedWordPair.word,
      mean: selectedWordPair.meaning
    });
  }

  updateWordPair() {
    this.pireditservice.updateWordPair(this.editWordPairForm.value).subscribe({
      next: (ress) => { this.retrieveWordPairEditForm() }
    })
    console.log(this.editWordPairForm.value)

  }

  getEditorByEditorId(editorId: any): string {
    this.userservice.getUserById(editorId).subscribe((user: User) => {
      console.log(user)
      this.displayName = user.userName
    })
    return this.displayName
  }
}
