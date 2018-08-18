import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { FoodPage } from './food.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: FoodPage }])
  ],
  declarations: [FoodPage]
})
export class FoodPageModule {}
