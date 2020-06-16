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
        loadChildren: () => import('./choose-address/choose-address.module').then(m => m.ChooseAddressPageModule)
      },
      {
        path: 'remark',
        loadChildren: () => import('./remark/remark.module').then(m => m.RemarkPageModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentPageModule)
      }
    ])
  ],
  declarations: [ConfirmOrderPage]
})
export class ConfirmOrderPageModule { }
