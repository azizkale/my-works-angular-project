import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css']
})
export class UsersettingsComponent implements OnInit {
  retrieveSingleUserForm: FormGroup
  usersRoles: []
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  createReteiveUserForm() {
    this.retrieveSingleUserForm = this.fb.group({
      email: ['', Validators.required],
      roles: ['', Validators.required],
    });

  }
  retrieveSingleUser() {

  }
}
