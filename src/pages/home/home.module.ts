import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectivesModule } from '../../directives';
import { HomePage } from './home';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}