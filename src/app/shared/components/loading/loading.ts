import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: 'loading.html',
  styleUrls: ['loading.scss']
})
export class LoadingComponent implements OnDestroy {
  timer: any;
  positionY: number;
  constructor() {
    this.positionY = 0;
    this.timer = setInterval(() => {
      this.positionY++;
    }, 600);
  }
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
