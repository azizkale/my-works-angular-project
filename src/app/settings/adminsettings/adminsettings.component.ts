import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'adminsettings',
  templateUrl: './adminsettings.component.html',
  styleUrls: ['./adminsettings.component.css']
})
export class AdminsettingsComponent implements OnInit {
  createGroupForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private groupservice: GroupService
  ) { }

  ngOnInit(): void {
    this.createCreateNewGroupForm();
    this.retrieveGroups()
  }

  createCreateNewGroupForm() {
    this.createGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      mentorEmail: ['', Validators.required],
    });
  }

  createGroup(groupName: any, mentorEmail: any) {
    this.groupservice.createGroup(groupName, mentorEmail).subscribe({
      next: (result) => {
        console.timeLog(result)
      }
    })
  }

  retrieveGroups() {
    this.groupservice.retrieveGroups().subscribe({
      next: (result) => {
        console.log(result)
      }
    })
  }
}
