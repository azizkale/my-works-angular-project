import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShbService } from 'src/app/services/shb.service';
import { SHB } from 'src/models/shb';

@Component({
  selector: 'app-shb',
  templateUrl: './shb.component.html',
  styleUrls: ['./shb.component.css']
})
export class ShbComponent implements OnInit {
  editForm: FormGroup;
  infos = ['info-1', 'info-2', 'info-3']

  constructor(
    private shbservice: ShbService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.setShbInfos();
  }
  createForm() {
    this.editForm = this.fb.group({
      shbName: ['', Validators.required],
      shbInfo: this.fb.array([]),
      shbHistory: [this.fb.control([]), Validators.required]
    });
  }
  setShbInfos() {
    this.infos.forEach((item, index) => {
      this.editForm.addControl(`item-${index}`, new FormControl(item));
    });
  }
  createShb() {
    this.shbservice.createShb(new SHB('hz. ali', 212121, new Date(), [], [])).subscribe({
      next: (ress) => {
        console.log(ress)
      }
    })
  }
}
