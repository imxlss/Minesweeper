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

  /**
   * 获取用户唯一识别码
   */
  getUUID(): string {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 60, 20);

    let base64 = canvas.toDataURL().replace('data:image/png;base64,', '');
    let bin = atob(base64); // 解码 base-64 编码的字符串

    return this._bin2hex(bin.slice(-16, -12));
  }

  /**
   * 字符串转为16进制数字
   * @param {string} str
   */
  private _bin2hex(str: string): string {
    let result = "";
    let tmp;

    for (let i = 0, len = str.length; i < len; i++) {
      tmp = str.charCodeAt(i).toString(16);
      result += tmp.length < 2 ? `0${tmp}` : tmp;
    }

    return result;
  }
}
