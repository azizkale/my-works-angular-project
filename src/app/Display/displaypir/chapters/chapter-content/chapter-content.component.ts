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

        // if selected chapter has wordpair (edited word)

        Object.values(this.chapterContent.nativeElement.getElementsByTagName('b')).map((el: HTMLElement | any) => {
          el.addEventListener('mouseover', () => {
          });
        })

      }
    })
  }
}
