import { MessageService } from './../service/message.service';
import { StatusType } from './../core/type';
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { UtilsService } from '../service/utils.service';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'mine-board',
  templateUrl: './mine-board.component.html',
  styleUrls: ['./mine-board.component.css']
})
export class MineBoardComponent implements OnInit {
  @Input()
  boardSize: number;
  @Input()
  mineCount: number;
  @Input()
  status: StatusType;

  @Output()
  flaggedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  flaggedCount: number;

  cellList = [];
  cellListMap = {};

  boardStyle = {
    width: `calc(${this.boardSize * 2}em + ${this.boardSize}px)`
  };

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.status$.subscribe(status => {
      if (status === 'ready') {
        this.restartInit();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.boardSize && !changes.boardSize.firstChange) {
      this.restartInit();
    }
  }

  restartInit() {
    this.cellList = [];
    this.cellListMap = {};
    this.generateCellList();
  }

  generateCellList() {
    this.initBoard();
    this.randomlyAssignMines();
    this.calculateNeighborMineCounts();
  }

  initBoard() {
    for (let row = 0; row < this.boardSize; row++) {
      let rowCellList = [];
      for (let column = 0; column < this.boardSize; column++) {
        let cell = this.cellFactory(row, column);
        rowCellList.push(cell);

        this.cellListMap[`${row}|${column}`] = cell;
      }
      this.cellList.push(rowCellList);
    }
  }

  // 随机放置地雷
  randomlyAssignMines() {
    let mineCooridinates = [];

    for (let i = 0; i < this.mineCount; i++) {
      let randomRowCoordinate = this.getRandomInteger(0, this.boardSize);
      let randomColumnCoordinate = this.getRandomInteger(0, this.boardSize);
      let cellId = `${randomRowCoordinate}|${randomColumnCoordinate}`;

      while (mineCooridinates.includes(cellId)) {
        randomRowCoordinate = this.getRandomInteger(0, this.boardSize);
        randomColumnCoordinate = this.getRandomInteger(0, this.boardSize);
        cellId = `${randomRowCoordinate}|${randomColumnCoordinate}`;
      }
      mineCooridinates.push(cellId);
      this.cellList[randomRowCoordinate][randomColumnCoordinate].mined = true;
    }
  }

  calculateNeighborMineCounts() {
    let cell;
    let neighborMineCount = 0;

    for (let row = 0; row < this.boardSize; row++) {
      for (let column = 0; column < this.boardSize; column++) {
        cell = this.cellList[row][column];
        let neighbors = this.getNeighbors(row, column);

        if (cell.mined === false) {
          neighborMineCount = 0;
          for (let i = 0; i < neighbors.length; i++) {
            neighborMineCount += this.isMined(neighbors[i]);
          }
          cell.neighborMineCount = neighborMineCount;
        }
      }
    }
  }

  // 单元格工厂
  cellFactory(
    row: number,
    column: number,
    opened = false,
    flagged = false,
    mined = false,
    neighborMineCount = 0
  ) {
    return {
      id: `${row}|${column}`,
      row,
      column,
      opened,
      flagged,
      mined,
      neighborMineCount
    };
  }

  getNeighbors(row: number, column: number) {
    let neighbors = [];
    neighbors.push(`${row - 1}|${column - 1}`);
    neighbors.push(`${row - 1}|${column}`);
    neighbors.push(`${row - 1}|${column + 1}`);
    neighbors.push(`${row}|${column - 1}`);
    neighbors.push(`${row}|${column + 1}`);
    neighbors.push(`${row + 1}|${column - 1}`);
    neighbors.push(`${row + 1}|${column}`);
    neighbors.push(`${row + 1}|${column + 1}`);

    return neighbors.filter(item => {
      let cooridinates = item.split('|');
      let row = cooridinates[0],
        column = cooridinates[1];
      return (
        row >= 0 &&
        column >= 0 &&
        column < this.boardSize &&
        row < this.boardSize
      );
    });
  }

  getNotOpenedNeighbors(id: string) {
    let cooridinates = id.split('|');
    let row = cooridinates[0],
      column = cooridinates[1];

    let neighbors = this.getNeighbors(+row, +column);

    return neighbors.filter(
      id =>
        this.cellListMap[id].opened === false &&
        this.cellListMap[id].flagged === false
    );
  }

  openNeighbors(id: string) {
    let notOpendNeighborsList = this.getNotOpenedNeighbors(id);

    return this.openCells(notOpendNeighborsList);
  }

  openCells(ids: Array<string>) {
    ids.forEach(id => {
      let cell = this.cellListMap[id];
      cell.opened = true;
      if (cell.neighborMineCount === 0 && !cell.mined) {
        this.openNeighbors(cell.id);
      }
    });
  }

  getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  isMined(id: string) {
    let mined = 0;
    let cooridinates = id.split('|');
    let row = cooridinates[0],
      column = cooridinates[1];

    let cell = this.cellList[row][column];
    if (typeof cell !== 'undefined') {
      mined = cell.mined ? 1 : 0;
    }
    return mined;
  }

  gameOver(gameOver: boolean) {
    if (gameOver === true) {
      console.log('game over');
      this.showAllMine();
    }
  }

  showAllMine() {
    for (let id in this.cellListMap) {
      let cell = this.cellListMap[id];
      cell.opened = true;
      // if (cell.mined === true && cell.flagged === false) {
      //   cell.opened = true;
      // };
    }
  }

  flaggedChangeFormCell(isFlagged: boolean) {
    let flaggedCountChange = isFlagged ? 1 : 0;
    this.flaggedCount += flaggedCountChange;

    this.flaggedChange.emit(isFlagged);

    this.gameWasVictory();
  }

  // 检查是否成功
  gameWasVictory() {
    if (this.flaggedCount !== this.mineCount) {
      return;
    }
    let gameResult = this.cellList.every(rowCellList => {
      return rowCellList.every(
        cell =>
          cell.mined && cell.flagged && (cell.mined === false && cell.opened)
      );
    });

    if (gameResult) {
      return this.messageService.gameOver$.next({
        gameOver: true,
        gameResult: 'victory'
      });
    }
  }

  handleContextmenu() {
    return false;
  }
}
