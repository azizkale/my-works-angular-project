import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/models/Group';

@Component({
  selector: 'adminsettings',
  templateUrl: './adminsettings.component.html',
  styleUrls: ['./adminsettings.component.css']
})
export class AdminsettingsComponent implements OnInit {
  createGroupForm: FormGroup
  retrieveGroupsForm: FormGroup
  updateGroupForm: FormGroup
  groups: Group[];

  constructor(
    private fb: FormBuilder,
    private groupservice: GroupService
  ) { }

  ngOnInit(): void {
    this.retrieveGroups()
    this.createCreateNewGroupForm();
    this.createReteiveGroupsForm();
    this.createUpdateGroupForm();
  }

  // forms=====================
  createCreateNewGroupForm() {
    this.retrieveGroupsForm = this.fb.group({
      groupName: ['', Validators.required],
      mentorEmail: ['', Validators.required],
    });
  }
  createReteiveGroupsForm() {
    this.createGroupForm = this.fb.group({
      groupId: ['', Validators.required],
      groupName: ['', Validators.required],
      mentorEmail: ['', Validators.required],
    });
  }
  createUpdateGroupForm() {
    this.updateGroupForm = this.fb.group({
      groupId: ['', Validators.required],
      mentorId: ['', Validators.required],
      groupName: ['', Validators.required],
      mentorEmail: ['', Validators.required],
    });
  }

  // functions to Groups=================
  createGroup(groupName: any, mentorEmail: any) {
    this.groupservice.createGroup(groupName, mentorEmail).subscribe({
      next: (result) => {
        console.log(result)
        this.retrieveGroups()
      }
    })
  }

  retrieveGroups() {
    this.groups = []
    this.groupservice.retrieveGroups().subscribe({
      next: (result) => {
        if (result) {
          this.groups = Object.values(result)
          this.groups.forEach((group: Group) => {
            this.retrieveGroupsForm.addControl(group.groupName, new FormControl(group.groupName));
          });
        }

      }, error: (error) => {
        console.log(error)
      }
    })
  }

  updateGroup() {
    console.log(this.updateGroupForm.value)
  }

  // functions to Users=================
  retrieveSingleUser() {

  }
}
