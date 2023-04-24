import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private activeroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.selectedPirId = this.activeroute.snapshot.paramMap.get('id');
    this.formChapterRetrieve()
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

  retrievePirByPirId() {

  }
}
