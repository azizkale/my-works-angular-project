import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PireditService } from 'src/app/services/piredit.service';
import { UserService } from 'src/app/services/user.service';
import { Chapter } from 'src/models/Chapter';
import { WordPair } from 'src/models/WordPair';

@Component({
  selector: 'wordpairedit',
  templateUrl: './wordpairedit.component.html',
  styleUrls: ['./wordpairedit.component.css']
})
export class WordpaireditComponent implements OnInit {
  // this component is displayed by directive --> <wordpairedit></wordpairedit>

  @Input() pirId: any
  wordPairs: any[] = []
  retrieveWordPairs: FormGroup
  editWordPairForm: FormGroup;
  selectedWordPairToEdit: WordPair
  uid = localStorage.getItem('uid')
  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.retrieveAllWordPairsOfSinglePir()
    this.retrieveWordPairEditForm()
    this.createEditWordPairForm();
  }

  retrieveWordPairEditForm() {
    this.retrieveWordPairs = this.fb.group({
      word: ['', Validators.required],
      meaning: ['', Validators.required]
    });
  }

  retrieveAllWordPairsOfSinglePir() {
    this.wordPairs = []
    this.pireditservice.retrieveAllWordPairsOfSinglePir(this.pirId).subscribe({
      next: (wordpairs: WordPair[]) => {
        this.wordPairs = wordpairs

      }, complete: async () => {
        this.wordPairs.map(async (wp: any) => {
          this.userservice.retrieveEditorbyEditorId(wp.editorId).subscribe({
            next: (val: any) => { wp.editorname = val.displayName }
          })
        })
      }
    })
  }

  createEditWordPairForm() {
    this.editWordPairForm = this.fb.group({
      word: ['', Validators.required],
      meaning: ['', Validators.required]
    });
  }

  getWordPairToEdit(selectedWordPair: WordPair) {
    this.selectedWordPairToEdit = selectedWordPair
    this.editWordPairForm.patchValue({
      word: selectedWordPair.word,
      meaning: selectedWordPair.meaning
    });
  }

  updateWordPair() {
    this.selectedWordPairToEdit.word = this.editWordPairForm.get('word')?.value;
    this.selectedWordPairToEdit.meaning = this.editWordPairForm.get('meaning')?.value;
    this.pireditservice.updateWordPair(this.selectedWordPairToEdit).subscribe({
      next: (ress) => {
        this.retrieveAllWordPairsOfSinglePir()
      }
    })
  }
}
