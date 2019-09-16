import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  before(fn: Function, beforeFn: Function) {
    return function () {
      if (beforeFn.apply(this, arguments) === false) {
        return;
      }

      return fn.apply(this, arguments);
    }
  }
}
