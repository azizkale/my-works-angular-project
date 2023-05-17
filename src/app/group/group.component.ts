import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  selectedGroupId: any
  constructor(
    private activeroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.selectedGroupId = this.activeroute.snapshot.paramMap.get('id');
    console.log(this.selectedGroupId)
  }

}
