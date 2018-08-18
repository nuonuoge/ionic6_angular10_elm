import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
