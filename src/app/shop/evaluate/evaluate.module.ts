import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ShopEvaluatePage } from './evaluate.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ShopEvaluatePage }])
  ],
  declarations: [ShopEvaluatePage]
})
export class ShopEvaluatePageModule {}
