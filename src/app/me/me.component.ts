import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // Toggle between showing and hiding the sidebar, and add overlay effect
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
  w3_close(mySidebar: any, myOverlay: any) {
    mySidebar.style.display = "none";
    myOverlay.style.display = "none";
  }
}
