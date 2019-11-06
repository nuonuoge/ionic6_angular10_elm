import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeLast', pure: false })
export class TimeLastPipe implements PipeTransform {
  timer: any;
  countNum: number = 900;
  constructor() {
    setInterval(() => {
      this.countNum--;
      if (this.countNum === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
  transform(value: number, ...args: any[]): string {
    const time = this.countNum - value;
    let minute: any = parseInt((time / 60).toString(), 10);
    let second: any = parseInt((time % 60).toString(), 10);
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
    return '去支付(还剩' + minute + '分' + second + '秒)';
  }
}
