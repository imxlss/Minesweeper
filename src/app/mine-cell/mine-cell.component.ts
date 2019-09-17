import { MessageService } from './../service/message.service';
import { UtilsService } from './../service/utils.service';
import { StatusType } from './../core/type';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mine-cell',
  templateUrl: './mine-cell.component.html',
  styleUrls: ['./mine-cell.component.css']
})
export class MineCellComponent implements OnInit {
  @Input()
  id: string;
  @Input()
  opened: boolean = false;
  @Input()
  flagged: boolean = false;
  @Input()
  mined: boolean = false;
  @Input()
  neighborMineCount: number = 0;

  @Input()
  status: StatusType = 'ready';

  @Output()
  openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  flaggedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  openNeighbors: EventEmitter<string> = new EventEmitter<string>();

  get cellText() {
    if (this.flagged) {
      return '⛳️';
    }
    if (this.mined && this.opened) {
      return '💣';
    }
    if (this.neighborMineCount === 0) {
      return '';
    }
    if (this.opened) {
      return this.neighborMineCount;
    }
  }

  constructor(
    private utilsService: UtilsService,
    private messageService: MessageService
  ) {
    this.openCell = this.utilsService.before(this.openCell, this.canClick);
    this.flaggedCell = this.utilsService.before(
      this.flaggedCell,
      this.canClick
    );
  }

  ngOnInit() {
    this.messageService.getStatus().subscribe(status => {
      this.status = status;
    });
  }

  canClick(): boolean {
    return this.status === 'progress';
  }

  openCell() {
    if (this.opened || this.flagged) return;

    this.opened = true;
    this.openedChange.emit(this.opened);

    if (this.mined) {
      return this.messageService.sendStatus('loss');
    }

    if (this.neighborMineCount === 0) {
      this.openNeighbors.emit(this.id);
    }
  }

  flaggedCell() {
    if (this.opened) return false;

    this.flagged = !this.flagged;
    this.flaggedChange.emit(this.flagged);
    return false;
  }
}
