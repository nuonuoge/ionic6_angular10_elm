import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './components';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    NgZorroAntdMobileModule
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
