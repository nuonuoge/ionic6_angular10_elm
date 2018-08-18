import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { OrderPage } from './order.page';
import { TimeLastPipe } from './time-last.pipe';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OrderPage }
    ])
  ],
  declarations: [OrderPage, TimeLastPipe]
})
export class OrderPageModule {}
