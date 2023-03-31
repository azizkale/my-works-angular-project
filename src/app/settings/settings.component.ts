import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('alertParent', { static: true }) alertParent: ElementRef

  settingsForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private settings: SettingsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.retrieveUserInfo();
  }
  createForm() {
    this.settingsForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  retrieveUserInfo() {
    this.settings.retrieveUserInfo().subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }
}
