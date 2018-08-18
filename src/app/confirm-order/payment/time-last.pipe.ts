import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeLast' })
export class TimeLastPipe implements PipeTransform {
  transform(value: number, exponent: string): string {
    let minute: any = parseInt((value / 60).toString());
    if (minute < 10) {
      minute = '0' + minute;
    }
    let second: any = parseInt((value % 60).toString());
    if (second < 10) {
      second = '0' + second;
    }
    return '00 : ' + minute + ' : ' + second;
  }
}
