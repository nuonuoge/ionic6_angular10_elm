import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { ComponentsModule } from '../components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgZorroAntdMobileModule
  ],
  entryComponents: [],
})
export class SharedModule {}
