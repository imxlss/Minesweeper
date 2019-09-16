import { StatusType, IBoardIInfo } from './core/type';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  boardSize: number = 10;
  mineCount: number = 10;
  status: StatusType = 'ready';

  showResult = false;

  flaggedCount: number = 0;

  levelChange(boardInfo: IBoardIInfo) {
    console.log(boardInfo);
    this.boardSize = boardInfo.boardSize;
    this.mineCount = boardInfo.mineCount;
  }

  statusChange(status: StatusType) {
    this.status = status;
  }

  flaggedChange(flagged: boolean) {
    if (flagged) {
      return this.flaggedCount++;
    }

    return this.flaggedCount--;
  }
}
