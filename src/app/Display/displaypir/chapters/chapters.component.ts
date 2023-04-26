import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisplaypirService } from 'src/app/services/displaypir.service';
import { Chapter } from 'src/models/Chapter';
import { Pir } from 'src/models/Pir';
import { WordPair } from 'src/models/WordPair';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  retrieveChapterForm: FormGroup;
  selectedPirId: any;
  pir: Pir
  chaptersNames: any[]
  selectedChapter: Chapter

  constructor(
    public fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private displaypirservice: DisplaypirService,
  ) { }

  async ngOnInit() {
    this.selectedPirId = await this.activeroute.snapshot.paramMap.get('id');
    await this.formChapterRetrieve()
    await this.retrieveChaptersNamesByPirId();
  }
  formChapterRetrieve() {
    this.retrieveChapterForm = this.fb.group({
      chapterId: ['', Validators.required],
      pirId: ['', Validators.required],
      editorId: ['', Validators.required],
      createDate: ['', Validators.required],
      chapterContent: ['', Validators.required],
      chapterName: this.fb.array([]),

    });

  }

  retrieveChaptersNamesByPirId() {
    this.displaypirservice.retrieveChaptersNamesByPirId(this.selectedPirId).subscribe({
      next: (data) => {
        this.chaptersNames = data
      }
    })
  }

  retrieveChaptertByChapterId(chapterId: any, element: HTMLElement) {
    this.displaypirservice.retrieveChapterByChapterId(chapterId, this.selectedPirId).subscribe({
      next: async (ress: Chapter) => {
        this.selectedChapter = await ress;
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
            element.innerHTML = this.selectedChapter.chapterContent;
            //adding event to <b> - tags
            Object.values(element.getElementsByTagName('b')).map((el: HTMLElement) => {
              el.addEventListener('mouseover', () => {
                const pair: WordPair | any = Object.values(this.selectedChapter.wordPairs).find((p: WordPair) => p.wordPairId = el.id)
              });
            })
          })
        }
      }
    })
  }

}
