import { StatusType, LevelType } from './../core/type';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  refreshRankList$ = new Subject<boolean>();
  private status$ = new BehaviorSubject<StatusType>('ready');

  sendStatus(status: StatusType) {
    this.status$.next(status);
  }

  getStatus(): Observable<StatusType> {
    return this.status$.asObservable();
  }

  private level$ = new BehaviorSubject<LevelType>('easy');

  sendLevel(level: LevelType) {
    this.level$.next(level);
  }

  getLevel(): Observable<LevelType> {
    return this.level$.asObservable();
  }

  constructor() { }
}
