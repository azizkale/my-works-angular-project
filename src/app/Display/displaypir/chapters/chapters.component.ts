import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisplaypirService } from 'src/app/services/displaypir.service';
import { Chapter } from 'src/models/Chapter';
import { Pir } from 'src/models/Pir';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  @ViewChild('chapterContentTag') chapterContentTag: ElementRef
  retrieveChapterForm: FormGroup;
  selectedPirId: any;
  pir: Pir
  chaptersNames: any[]
  selectedChapter: Chapter

  constructor(
    public fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private displaypirservice: DisplaypirService,
    private renderer: Renderer2
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
        element.innerHTML = await this.selectedChapter.chapterContent;
      }
    })
  }
}
