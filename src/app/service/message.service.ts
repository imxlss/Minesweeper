import { StatusType } from './../core/type';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private status$ = new BehaviorSubject<StatusType>('ready');

  sendStatus(status: StatusType) {
    this.status$.next(status);
  }

  getStatus(): Observable<any> {
    return this.status$.asObservable();
  }

  constructor() { }
}
