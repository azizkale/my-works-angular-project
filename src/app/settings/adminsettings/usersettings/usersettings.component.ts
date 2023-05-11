import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css']
})
export class UsersettingsComponent implements OnInit {
  retrieveSingleUserForm: FormGroup
  usersRoles: []
  constructor(
    private fb: FormBuilder,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.createReteiveUserForm()
  }

  createReteiveUserForm() {
    this.retrieveSingleUserForm = this.fb.group({
      email: ['', Validators.required],
      roles: ['', Validators.required],
    });

  }

  retrieveSingleUser(email: any) {
    this.userservice.retrieveUserByEmail(email).subscribe(({
      next: (user) => {
        console.log(user)
      }
    }))
  }
}
