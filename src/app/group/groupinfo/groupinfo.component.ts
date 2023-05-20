import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-groupinfo',
  templateUrl: './groupinfo.component.html',
  styleUrls: ['./groupinfo.component.css']
})
export class GroupinfoComponent implements OnInit {

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
    this.selectedGroupId = this.activeroute.snapshot.paramMap.get('groupid');
    //to create works for group(localStorage)
    localStorage.setItem('groupId', this.selectedGroupId);
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
      works: [], //it is null for now 
      users: [] //fullfilled below at retrieveSingleGroupByGroupId func.
    });
  }

  //methods ========================
  retrieveSingleGroupByGroupId() {
    this.groupservice.retrieveSingleGroupOfUserByGroupId(this.selectedGroupId).subscribe({
      next: (group) => {
        this.usersOfTheGroup = []
        this.retrieveGroupForm.patchValue(group)

        //{email,role} list
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
