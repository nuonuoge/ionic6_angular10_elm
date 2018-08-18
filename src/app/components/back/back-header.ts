import { Component, Input } from '@angular/core';

@Component({
  selector: 'back-header',
  template: `
    <ion-toolbar color="primary">
      <back-icon></back-icon>
      <ion-title>{{hTitle}}</ion-title>
    </ion-toolbar>
  `,
  styles: [`
    .back-icon {
      margin: 0 -5px 0 -4px;
    }
  `]
})
export class BackHeaderComponent {
  @Input() hTitle: string;
}
