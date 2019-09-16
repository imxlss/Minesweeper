import { GameResultType, StatusType } from './../core/type';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IGameOver {
  gameOver: boolean;
  gameResult: GameResultType;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  gameOver$: BehaviorSubject<IGameOver> = new BehaviorSubject<IGameOver>({ gameOver: false, gameResult: 'victory' });

  status$:BehaviorSubject<StatusType> = new BehaviorSubject<StatusType>('ready');

  constructor() { }
}
