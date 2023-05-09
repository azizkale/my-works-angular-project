import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PireditService } from 'src/app/services/piredit.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';
import { Roles } from 'src/models/Roles';
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
  allowedToPirEditor: boolean

  constructor(
    public fb: FormBuilder,
    private pireditservice: PireditService,
    private userservice: UserService,
    private rolesservice: RolesService
  ) { }

  ngOnInit(): void {
    this.retrieveAllWordPairsOfSinglePir()
    this.retrieveWordPairEditForm()
    this.createEditWordPairForm();
    this.allowedToPirEditor = this.rolesservice.checkRole(Roles[4])
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

  deleteWordpair() {
    this.pireditservice.deleteWordPair(this.selectedWordPairToEdit).subscribe({
      next: (ress) => { this.retrieveAllWordPairsOfSinglePir() }
    })
  }
}
