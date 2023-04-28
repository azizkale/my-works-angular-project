import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisplaypirService } from 'src/app/services/displaypir.service';
import { Chapter } from 'src/models/Chapter';
import { WordPair } from 'src/models/WordPair';

@Component({
  selector: 'app-chapter-content',
  templateUrl: './chapter-content.component.html',
  styleUrls: ['./chapter-content.component.css']
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
    private displaypirservice: DisplaypirService
  ) {
    this.formChapterRetrieve()

  }

  async ngOnInit() {
    this.selectedChapterId = await this.activeroute.snapshot.paramMap.get('contentId');
    this.selectedPirId = await this.activeroute.snapshot.paramMap.get('pirId');
    this.retrieveChaptertByChapterId(this.selectedChapterId)
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


  retrieveChaptertByChapterId(chapterId: any) {
    this.displaypirservice.retrieveChapterByChapterId(chapterId, this.selectedPirId).subscribe({
      next: async (ress: Chapter) => {
        this.selectedChapter = await ress;
        console.log(ress)
        // if selected chapter has wordpair (edited word)
        if (this.selectedChapter.wordPairs) {
          Object.values(this.selectedChapter.wordPairs).map((pair: WordPair) => {
            //the words that has been edited are changed
            //the meaning are dsplaying here          
            const searchWord = pair.word;
            const replaceWord = `<b id='${pair.wordPairId}'>${pair.word} </b>`;
            const index = this.selectedChapter.chapterContent.indexOf(searchWord);

            if (index !== -1) {
              const newText = this.selectedChapter.chapterContent.slice(0, index) + replaceWord + this.selectedChapter.chapterContent.slice(index + searchWord.length);
              this.selectedChapter.chapterContent = newText
            } else {
              console.log('Search word not found.');
            }

            this.chapterContent.nativeElement.innerHTML = this.selectedChapter.chapterContent;
            //adding event to <b> - tags

            Object.values(this.chapterContent.nativeElement.getElementsByTagName('b')).map((el: HTMLElement | any) => {
              el.addEventListener('mouseover', () => {
                const pair: WordPair | any = Object.values(this.selectedChapter.wordPairs).find((p: WordPair) => p.wordPairId = el.id)
                console.log(pair)
              });
            })
          })
        }
      }
    })
  }
}
