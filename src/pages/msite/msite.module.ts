import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components';
import { MsitePage } from './msite';

@NgModule({
  declarations: [
    MsitePage,
  ],
  imports: [
    IonicPageModule.forChild(MsitePage),
    ComponentsModule
  ],
  exports: [
    MsitePage
  ]
})
export class MsitePageModule {}
