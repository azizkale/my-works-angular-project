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
  }

  createCreateNewGroupForm() {
    this.createGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      mentorId: ['', Validators.required],
    });
  }

  createGroup(groupName: any, mentorId: any) {
    this.groupservice.createGroup(groupName, mentorId).subscribe({
      next: (result) => {
        console.timeLog(result)
      }
    })
  }
}
