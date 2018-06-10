import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment';
import { ComponentsModule } from '../../../components';
import { TimeLastPipe } from './time-last.pipe';

@NgModule({
  declarations: [
    PaymentPage,
    TimeLastPipe
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PaymentPage)
  ]
})
export class PaymentPageModule {}