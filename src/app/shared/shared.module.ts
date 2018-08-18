import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
    ComponentsModule
  ],
  entryComponents: [],
})
export class SharedModule {}
