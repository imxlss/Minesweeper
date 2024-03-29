import { UtilsService } from './../service/utils.service';
import { MessageService } from './../service/message.service';
import { levelMap } from './../core/type';
import { HttpService } from './../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.css']
})
export class RankListComponent implements OnInit {
  uuid: string;
  rankList = [];
  levelNumber: number;

  constructor(private httpService: HttpService, private messageService: MessageService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.getUUID();

    this.messageService.getLevel().subscribe(level => {
      this.levelNumber = levelMap[level];
      this.getRankList();
    })

    this.messageService.refreshRankList$.subscribe(res => {
      if (res === true) {
        this.getRankList();
      }
    })
  }

  getUUID() {
    this.uuid = this.utilsService.getUUID();
  }

  getRankList() {
    this.httpService.getRankList({ level: this.levelNumber }).subscribe(res => {
      this.rankList = res.result.data;
    })
  }

}
