import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order';
import { ComponentsModule } from '../../components';
import { TimeLastPipe } from './time-last.pipe';

@NgModule({
  declarations: [
    OrderPage,
    TimeLastPipe
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(OrderPage)
  ]
})
export class OrderPageModule {}
