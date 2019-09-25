import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'index'
})
export class IndexPipe implements PipeTransform {

  transform(value: number): any {
    if (value === 1) {
      return '1️⃣';
    }
    if (value === 2) {
      return '2️⃣';
    }
    if (value === 3) {
      return '3️⃣';
    }

    return value;
  }

}
