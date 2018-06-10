import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemarkPage } from './remark';
import { ComponentsModule } from '../../../components';

@NgModule({
  declarations: [
    RemarkPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RemarkPage)
  ]
})
export class RemarkPageModule {}