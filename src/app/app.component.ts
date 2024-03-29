import { IBoardIInfo } from './core/type';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  boardSize: number = 10;
  mineCount: number = 10;

  showResult = false;

  flaggedCount: number = 0;

  levelChange(boardInfo: IBoardIInfo) {
    this.boardSize = boardInfo.boardSize;
    this.mineCount = boardInfo.mineCount;
  }

  flaggedChange(flagged: boolean) {
    if (flagged) {
      return this.flaggedCount++;
    }

    return this.flaggedCount--;
  }
}
