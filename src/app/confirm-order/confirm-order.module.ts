import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ConfirmOrderPage } from './confirm-order.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfirmOrderPage,
      },
      {
        path: 'chooseAddress',
        loadChildren: './choose-address/choose-address.module#ChooseAddressPageModule'
      },
      {
        path: 'remark',
        loadChildren: './remark/remark.module#RemarkPageModule'
      },
      {
        path: 'payment',
        loadChildren: './payment/payment.module#PaymentPageModule'
      }
    ])
  ],
  declarations: [ConfirmOrderPage]
})
export class ConfirmOrderPageModule { }
