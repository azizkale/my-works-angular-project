import { Component, OnInit, Renderer2 } from '@angular/core';
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
  retrieveChapterForm: FormGroup;
  selectedPirId: any;
  pir: Pir
  chapters: any[]

  constructor(
    public fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private displaypirservice: DisplaypirService,
    private renderer: Renderer2
  ) { }

  async ngOnInit() {
    this.selectedPirId = await this.activeroute.snapshot.paramMap.get('id');
    await this.formChapterRetrieve()
    await this.retrieveChaptersByPirId();
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

  retrieveChaptersByPirId() {
    this.displaypirservice.retrieveChaptersByPirId(this.selectedPirId).subscribe({
      next: (pir: Pir) => {
        console.log(pir)
        this.chapters = Object.values(pir.chapters)
      }
    })
  }

  appendContentToTag(htmlElement: HTMLElement, chapter: Chapter) {
    const p: HTMLParagraphElement = this.renderer.createElement('b');
    p.innerHTML = chapter.chapterName
    this.renderer.appendChild(htmlElement, p)
  }
}
