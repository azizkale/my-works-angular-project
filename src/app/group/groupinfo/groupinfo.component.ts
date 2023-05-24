import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { PireditService } from 'src/app/services/piredit.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';
import { Group } from 'src/models/Group';
import { Pir } from 'src/models/Pir';
import { Roles } from 'src/models/Roles';

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
  updatePirForm: FormGroup;
  mentorsMetoringGroups: any[] //to display in template
  allowedToAdminAndMentor: boolean;
  pirs: Pir[];

  constructor(
    private activeroute: ActivatedRoute,
    private groupservice: GroupService,
    private fb: FormBuilder,
    private userservice: UserService,
    private pirservice: PireditService,
    private pireditservice: PireditService,
    private roleservice: RolesService
  ) {
    this.roleservice.getUserRoles(localStorage.getItem('uid')).subscribe({
      next: (roles) => {
        console.log(roles)
        this.allowedToAdminAndMentor = roles.includes(Roles[1]) || roles.includes(Roles[2])
      }
    })
  }

  ngOnInit(): void {
    this.selectedGroupId = this.activeroute.snapshot.paramMap.get('groupid');
    //to create works for the group(localStorage)
    // localStorage.setItem('groupId', this.selectedGroupId);
    this.retrieveSingleGroupByGroupId();
    this.createRetrieveGroupForm()
    this.createPirRetrieveForm();
    this.createUpdatePirForm();

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

  createUpdatePirForm() {
    this.updatePirForm = this.fb.group({
      pirId: ['', Validators.required],
      editorId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      groupName: ['dsada', Validators.required]
    });
    this.groupservice.retrieveAllGroupsOfTheMentor(localStorage.getItem('uid')).subscribe(({
      next: (groups) => { this.mentorsMetoringGroups = groups }
    }))
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

  selectPirToUpdate(pir: Pir) {
    this.updatePirForm = this.fb.group({
      pirId: [pir.pirId, Validators.required],
      editorId: [pir.editorId, Validators.required],
      name: [pir.name, Validators.required],
      description: [pir.description, Validators.required],
      groupName: [null, Validators.required] // Set initial value as null or any default value you want
    });

    this.groupservice.retrieveSingleGroupOfUserByGroupId(pir.groupId).subscribe({
      next: (group: Group | any) => {

        this.updatePirForm.patchValue({
          groupName: group.groupName // Set the value for groupName FormControl
        });
      }
    })
  }

  updatePir() {
    this.pireditservice.updatePir(this.updatePirForm.value).subscribe({
      next: (ress) => { this.retrieveSingleGroupByGroupId() }
    })

  }
}
