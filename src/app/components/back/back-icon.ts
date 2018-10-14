import { Component, Input } from '@angular/core';

@Component({
  selector: 'back-icon',
  template: `<Icon [type]="'left'" (click)="back()"></Icon>`,
})
export class BackIconComponent {
  back() {
    window.history.back();
  }
}
