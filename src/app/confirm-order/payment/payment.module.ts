import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { PaymentPage } from './payment.page';
import { TimeLastPipe } from './time-last.pipe';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: PaymentPage
      }
    ])
  ],
  declarations: [PaymentPage, TimeLastPipe]
})
export class PaymentPageModule { }

