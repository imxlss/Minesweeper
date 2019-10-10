import { gameResultMap } from './../core/type';
import { MessageService } from './../service/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mine-result',
  templateUrl: './mine-result.component.html',
  styleUrls: ['./mine-result.component.css']
})
export class MineResultComponent implements OnInit {
  showResult: boolean = false;
  resultText: string;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getStatus().subscribe(status => {
      if (['loss', 'victory'].includes(status)) {
        this.showResult = true;
        this.resultText = gameResultMap[status];
      } else {
        this.showResult = false;
      }
    });
  }

  againGame() {
    this.messageService.sendStatus('ready');
  }

  confirm() {
    this.showResult = false;
  }
}
