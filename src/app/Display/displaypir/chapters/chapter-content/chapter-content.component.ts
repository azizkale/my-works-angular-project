import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisplaypirService } from 'src/app/services/displaypir.service';
import { Chapter } from 'src/models/Chapter';
import { WordPair } from 'src/models/WordPair';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { take } from 'rxjs';




@Component({
  selector: 'app-chapter-content',
  templateUrl: './chapter-content.component.html',
  styleUrls: ['./chapter-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChapterContentComponent implements OnInit {
  @ViewChild('chapterContent') chapterContent: ElementRef
  selectedChapterId: any
  selectedPirId: any;
  selectedChapter: Chapter
  retrieveChapterContentForm: FormGroup

  constructor(
    public fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private displaypirservice: DisplaypirService,
    public dialog: MatDialog
  ) {
    this.formChapterRetrieve()

  }

  async ngOnInit() {
    this.selectedChapterId = await this.activeroute.snapshot.paramMap.get('contentId');
    this.selectedPirId = await this.activeroute.snapshot.paramMap.get('pirId');
    this.retrieveChaptertByChapterId()
  }

  formChapterRetrieve() {
    this.retrieveChapterContentForm = this.fb.group({
      chapterId: ['', Validators.required],
      pirId: ['', Validators.required],
      editorId: ['', Validators.required],
      createDate: ['', Validators.required],
      chapterContent: ['', Validators.required],
      chapterName: this.fb.array([]),

    });

  }


  retrieveChaptertByChapterId() {
    this.displaypirservice.retrieveChapterByChapterId(this.selectedChapterId, this.selectedPirId).subscribe({
      next: async (chapter: Chapter) => {
        this.selectedChapter = await chapter;

        this.chapterContent.nativeElement.innerHTML = this.selectedChapter.chapterContent;

        // adding mouseover event to the <b> tags
        Object.values(this.chapterContent.nativeElement.getElementsByTagName('b')).map((el: HTMLElement | any) => {
          el.addEventListener('mouseover', async () => {
            // getting meaning from wordPairs
            const word_: WordPair | any = Object.values(this.selectedChapter.wordPairs).find((pair: WordPair) => pair.word.trim() === el.innerHTML.trim())
            this.openDialog(word_)
          });
        })

      }
    })
  }


  openDialog(wordpair: WordPair): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: wordpair.word, age: wordpair.meaning }
    });
  }
}
