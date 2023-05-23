import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { PireditService } from 'src/app/services/piredit.service';
import { UserService } from 'src/app/services/user.service';
import { Group } from 'src/models/Group';
import { Pir } from 'src/models/Pir';

@Component({
  selector: 'app-groupinfo',
  templateUrl: './groupinfo.component.html',
  styleUrls: ['./groupinfo.component.css']
})
export class GroupinfoComponent implements OnInit {
  retrieveGroupForm: FormGroup
  retrievePirForm: FormGroup
  selectedGroupId: any
  usersOfTheGroup: any[];
  pirs: Pir[];

  constructor(
    private activeroute: ActivatedRoute,
    private groupservice: GroupService,
    private fb: FormBuilder,
    private userservice: UserService,
    private pirservice: PireditService
  ) { }

  ngOnInit(): void {
    this.selectedGroupId = this.activeroute.snapshot.paramMap.get('groupid');
    //to create works for group(localStorage)
    localStorage.setItem('groupId', this.selectedGroupId);
    console.log(this.selectedGroupId)
    this.retrieveSingleGroupByGroupId();
    this.createRetrieveGroupForm()
    this.createPirRetrieveForm()
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
  createPirRetrieveForm() {
    this.retrievePirForm = this.fb.group({
    });
    //formname array is fullfilled in the retrievePirsList function (below)

  }
  //methods ========================
  retrieveSingleGroupByGroupId() {
    this.groupservice.retrieveSingleGroupOfUserByGroupId(this.selectedGroupId).subscribe({
      next: async (group: Group | any) => {
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

        //list of pirs of the group
        this.pirs = []
        await Object.values(group.works.pirs).map(async (info: any | any) => {
          await this.pirservice.retrievePirByPirId(info.pirId).subscribe({
            next: async (pirr: Pir) => {
              await this.pirs.push(pirr)
              // Sort the pirs array in ascending order based on name
              await this.pirs.sort((a, b) => a.name.localeCompare(b.name));

              //create fotmcontrol
              // await this.pirs.forEach((pir, index) => {
              this.retrievePirForm.addControl(pirr.name, new FormControl(pirr.name));
              // });
            }
          })
        })


      }, complete: async () => {

      }
    })
  }
}
