import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/group.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  retrieveGroupForm: FormGroup
  selectedGroupId: any
  usersOfTheGroup: any[];

  constructor(
    private activeroute: ActivatedRoute,
    private groupservice: GroupService,
    private fb: FormBuilder,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.selectedGroupId = this.activeroute.snapshot.paramMap.get('id');
    console.log(this.selectedGroupId)
    this.retrieveSingleGroupByGroupId();
    this.createRetrieveGroupForm()
  }

  // forms==================
  createRetrieveGroupForm() {
    this.retrieveGroupForm = this.fb.group({
      groupId: ['', Validators.required],
      mentorId: ['', Validators.required],
      groupName: ['', Validators.required],
      mentorEmail: ['', Validators.required],
      users: [] //fullfilled below at retrieveSingleGroupByGroupId func.
    });
  }

  //methods ========================
  retrieveSingleGroupByGroupId() {
    this.groupservice.retrieveSingleGroupOfUserByGroupId(this.selectedGroupId).subscribe({
      next: (group) => {
        this.usersOfTheGroup = []
        this.retrieveGroupForm.setValue(group)

        //{uis,role} list
        this.usersOfTheGroup = Object.values(this.retrieveGroupForm.get('users')?.value);
        //list of the id of the users       
        for (const user of this.usersOfTheGroup) {
          this.userservice.retrieveUserById(user.uid).subscribe({
            next: (result) => {
              user.email = result.email
              this.retrieveGroupForm.addControl(user.uid, new FormControl(user.uid));
              this.retrieveGroupForm.addControl(user.email, new FormControl(user.email));
            }
          })
        }
      }, complete: () => {
        console.log(this.usersOfTheGroup)
      }
    })
  }

}
