import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { OrderDetailPage } from './order-detail.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: OrderDetailPage }])
  ],
  declarations: [OrderDetailPage]
})
export class OrderDetailPageModule {}

