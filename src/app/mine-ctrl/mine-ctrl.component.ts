import { HttpService } from './../service/http.service';
import { MessageService } from './../service/message.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LevelType, StatusType, levelMap } from '../core/type';
import { UtilsService } from '../service/utils.service';

const MineCountLevel = {
  easy: {
    boardSize: 10,
    mineCount: 10
  },
  medium: {
    boardSize: 16,
    mineCount: 32
  },
  hard: {
    boardSize: 22,
    mineCount: 50
  }
};

@Component({
  selector: 'mine-ctrl',
  templateUrl: './mine-ctrl.component.html',
  styleUrls: ['./mine-ctrl.component.css']
})
export class MineCtrlComponent implements OnInit {
  @Input() flaggedCount = 0;

  @Output() levelChange: EventEmitter<{
    boardSize: number;
    mineCount: number;
  }> = new EventEmitter<{ boardSize: number; mineCount: number }>();
  @Output() flaggedCountChange: EventEmitter<number> = new EventEmitter<number>();

  level: LevelType = 'easy';
  status: StatusType;
  time = 0;

  private _timer = null;

  get mineCount(): number {
    return MineCountLevel[this.level].mineCount;
  }

  constructor(
    private messageService: MessageService,
    private utilsService: UtilsService,
    private httpService: HttpService
  ) {
    this.changeLevel = this.utilsService.before(
      this.changeLevel,
      this.canChangeLevel
    );
  }

  ngOnInit() {
    this.messageService.getStatus().subscribe(status => {
      this.status = status;
      if (this.status === 'ready') {
        return this.resetGame();
      }
      if (['loss', 'victory'].includes(status)) {
        this.pauseTimer();
        if (status === 'victory') {
          this.appendScore();
        }
      }
    });
  }

  startGame() {
    this.status = 'progress';
    this.resetGame();
    this.startTimer();

    this.statusNext();
  }

  pauseGame() {
    this.status = 'pause';
    this.pauseTimer();

    this.statusNext();
  }

  continueGame() {
    this.status = 'progress';
    this.startTimer();

    this.statusNext();
  }

  stopGame() {
    this.status = 'ready';
    this.resetGame();
    this.statusNext();
  }

  restartGame() {
    this.status = 'ready';
    this.statusNext();
    this.startGame();
  }

  // 重置游戏数据
  resetGame() {
    this.pauseTimer();
    this.time = 0;
    this.flaggedCount = 0;
    this.flaggedCountChange.emit(this.flaggedCount);
  }

  statusNext() {
    this.messageService.sendStatus(this.status);
  }

  startTimer() {
    this._timer = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this._timer);
    this._timer = null;
  }

  changeLevel(level: LevelType) {
    this.level = level;
    this.messageService.sendLevel(this.level);
    this.levelChange.emit(MineCountLevel[this.level]);
  }

  canChangeLevel(): boolean {
    return this.status === 'ready';
  }

  appendScore() {
    this.httpService.appendScore({
      level: levelMap[this.level],
      duration: this.time,
      uuid: this.utilsService.getUUID()
    }).subscribe(res => {
      console.log(res);
    })
  }
}
