import { HttpService } from './../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.css']
})
export class RankListComponent implements OnInit {
  rankList = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.rankListFor();
  }

  rankListFor(level = 0) {
    this.httpService.getRankList({ level }).subscribe(res => {
      this.rankList = res.result.data;
    })
  }

}
