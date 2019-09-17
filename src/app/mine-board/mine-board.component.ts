import { MessageService } from './../service/message.service';
import { ICell } from './../core/type';
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'mine-board',
  templateUrl: './mine-board.component.html',
  styleUrls: ['./mine-board.component.css']
})
export class MineBoardComponent implements OnInit {
  @Input() boardSize: number;
  @Input() mineCount: number;

  @Output() flaggedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  flaggedCount: number = 0;
  cellList = [];
  cellListMap = {};
  boardStyle = {
    width: `calc(${this.boardSize * 2}em + ${this.boardSize}px)`
  };

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getStatus().subscribe(status => {
      if (status === 'ready') {
        return this.restartInit();
      }
      if (status === 'loss') {
        return this.showAllMine();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.boardSize && !changes.boardSize.firstChange) {
      this.restartInit();
    }
  }

  restartInit() {
    this.cellList = [];
    this.cellListMap = {};
    this.flaggedCount = 0;
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
    let cell: ICell;
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
  cellFactory(row: number, column: number, opened = false, flagged = false, mined = false, neighborMineCount = 0): ICell {
    return {
      id: `${row}|${column}`,
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
      let [row, column] = item.split('|');

      return (
        row >= 0 &&
        column >= 0 &&
        column < this.boardSize &&
        row < this.boardSize
      );
    });
  }

  getNotOpenedNeighbors(id: string) {
    let [row, column] = id.split('|');

    let neighbors = this.getNeighbors(+row, +column);

    return neighbors.filter(
      id =>
        this.cellListMap[id].opened === false &&
        this.cellListMap[id].flagged === false
    );
  }

  openNeighbors(id: string) {
    let notOpendNeighborsList = this.getNotOpenedNeighbors(id);
    this.openCells(notOpendNeighborsList);
    return setTimeout(() => {
      this.gameWasVictory()
    }, 0);;
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
    let [row, column] = id.split('|');

    let cell = this.cellList[row][column];
    if (typeof cell !== 'undefined') {
      mined = cell.mined ? 1 : 0;
    }
    return mined;
  }

  showAllMine() {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        this.cellList[i][j].opend = true;
      }
    }
  }

  flaggedChangeFormCell(isFlagged: boolean) {
    let flaggedCountChange = isFlagged ? 1 : -1;
    this.flaggedCount += flaggedCountChange;
    this.flaggedChange.emit(isFlagged);

    console.log(this.flaggedCount);
    return setTimeout(() => {
      this.gameWasVictory()
    }, 0);;
  }

  openedChange() {
    return setTimeout(() => {
      this.gameWasVictory()
    }, 0);;
  }

  // 检查是否成功
  gameWasVictory() {
    if (this.flaggedCount !== this.mineCount) {
      return;
    }
    let gameResult = this.cellList.every(rowCellList => {
      return rowCellList.every((cell: ICell) => {
        return ((cell.mined && cell.flagged) || (cell.mined === false && cell.opened));
      });
    });
    if (gameResult) {
      return this.messageService.sendStatus('victory');
    }
  }

  handleContextmenu() {
    return false;
  }
}
