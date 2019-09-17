import { MessageService } from './../service/message.service';
import { Component, OnInit } from '@angular/core';

const resultMap = {
  loss: '失败了！继续努力吧笨蛋~',
  victory: '恭喜你，取得了游戏的胜利！'
};

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
        this.resultText = resultMap[status];
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
