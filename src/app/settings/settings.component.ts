import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';

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
    private settings: SettingsService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.retrieveUserInfo();
  }
  createForm() {
    this.settingsForm = this.fb.group({
      email: ['', Validators.required],
      displayName: ['', Validators.required],
      photoURL: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  retrieveUserInfo() {
    this.settings.retrieveUserInfo().subscribe({
      next: (response) => {
        this.settingsForm = this.fb.group({
          email: [response.email, Validators.required],
          displayName: [response.displayName, Validators.required],
          photoURL: [response.photoURL, Validators.required],
          newPassword: [response.newPassword, Validators.required],
        });
      }
    })
  }

  updateUser(form: FormGroup) {
    const updateObject = {
      'email': form.controls['email']?.value,
      'displayName': form.controls['displayName']?.value,
      'photoURL': form.controls['photoURL']?.value
    }
    this.settings.updateUser(updateObject).subscribe({
      next: async (response) => {
        if (response.displayName !== localStorage.getItem('displayName')) {
          localStorage.clear();
          this.router.navigate(['signin']);
        }
      }
    })
  }
}
