import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RolesService } from '../services/roles.service';
import { Roles } from 'src/models/Roles';

@Component({
  selector: 'groupsidebar',
  templateUrl: './groupsidebar.component.html',
  styleUrls: ['./groupsidebar.component.css']
})
export class GroupsidebarComponent implements OnInit {
  allowPirEdit: boolean = this.rolesservice.checkRole(Roles[4]) || this.rolesservice.checkRole(Roles[1])
  constructor(
    private authService: AuthenticationService,
    private rolesservice: RolesService
  ) { }

  ngOnInit(): void {
  }

  w3_open(mySidebar: any, myOverlay: any) {
    if (mySidebar.style.display === "block") {
      mySidebar.style.display = "none";
      myOverlay.style.display = "none";
    } else {
      mySidebar.style.display = "block";
      myOverlay.style.display = "block";
    }
  }
  // Close the sidebar with the close button
  w3_close(mySidebar: HTMLElement, myOverlay: HTMLElement) {
    mySidebar.style.display = "none";
    myOverlay.style.display = "none";
  }

  singOut() {
    this.authService.signOut();

  }

}
