import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.css']
})
export class RankListComponent implements OnInit {
  rankList = [
    {
      uuid: 'asdsad',
      duration: 100,
    },
    {
      uuid: 'asdsad',
      duration: 101,
    },
    {
      uuid: 'asdsad',
      duration: 103,
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
