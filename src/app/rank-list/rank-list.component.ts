import { MessageService } from './../service/message.service';
import { LevelType, levelMap } from './../core/type';
import { HttpService } from './../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.css']
})
export class RankListComponent implements OnInit {
  rankList = [];
  levelNumber: number;

  constructor(private httpService: HttpService, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getLevel().subscribe(level => {
      this.levelNumber = levelMap[level];
      this.rankListFor();
    })
  }

  rankListFor() {
    this.httpService.getRankList({ level: this.levelNumber }).subscribe(res => {
      this.rankList = res.result.data;
    })
  }

}
