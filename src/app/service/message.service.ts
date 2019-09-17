import { GameResultType, StatusType } from './../core/type';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

interface IGameOver {
  gameOver: boolean;
  gameResult: GameResultType;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private status$ = new Subject<any>();

  sendStatus(status: StatusType) {
    this.status$.next(status);
  }

  clearMessage() {
    this.status$.next();
  }

  getStatus(): Observable<any> {
    return this.status$.asObservable();
  }

  constructor() { }
}
