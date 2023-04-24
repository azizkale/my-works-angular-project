import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisplaypirService } from 'src/app/services/displaypir.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  retrieveChapterForm: FormGroup;
  selectedPirId: any;

  constructor(
    public fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private displaypirservice: DisplaypirService
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
      next: (ress) => {
        console.log(ress)
      }
    })
  }
}
