import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PireditService } from 'src/app/services/piredit.service';
import { Chapter } from 'src/models/Chapter';
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

  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService,
  ) { }

  ngOnInit(): void {
    this.retrieveChaptersByEditorId()
    this.retrieveWordEditForm()
  }

  retrieveWordEditForm() {
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
}
