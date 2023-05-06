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
  // this component is displayed by directive --> <wordpairedit></wordpairedit>

  @Input() pirId: any
  wordPairs: WordPair[] = []
  retrieveWordPairs: FormGroup
  editWordPairForm: FormGroup;
  selectedWordPairToEdit: WordPair

  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService
  ) { }

  ngOnInit(): void {
    this.retrieveAllWordPairsOfThePir()
    this.retrieveWordPairEditForm()
    this.createEditWordPairForm();
  }

  retrieveWordPairEditForm() {
    this.retrieveWordPairs = this.fb.group({
      word: ['', Validators.required],
      meaning: ['', Validators.required]
    });
  }

  retrieveAllWordPairsOfThePir() {
    this.wordPairs = []
    this.pireditservice.retrieveAllWordPairsOfSinglePir(this.pirId).subscribe({
      next: (wordpairs: WordPair[]) => {
        this.wordPairs = wordpairs

      }, complete: () => { }
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
        console.log(ress)
        this.retrieveAllWordPairsOfThePir()
      }
    })

  }

}
