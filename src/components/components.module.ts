import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ShoplistComponent } from './shop/list/shop-list';
import { ShopSearchComponent } from './shop/search/shop-search';
import { ShopMsiteComponent } from './shop/msite/shop-msite';
import { ShopEvaluateComponent } from './shop/evaluate/evaluate';
import { RatingStarComponent } from './rating-star/rating-star';
import { LoadingComponent } from './loading/loading';
import { ElmSvgComponent } from './svg/svg';
import { BuyCartComponent } from './buy-cart/buy-cart';
import { DirectivesModule } from '../directives';

@NgModule({
  declarations: [
    ShoplistComponent,
    ShopSearchComponent,
    ShopMsiteComponent,
    ShopEvaluateComponent,
    RatingStarComponent,
    LoadingComponent,
    ElmSvgComponent,
    BuyCartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    DirectivesModule
  ],
  exports: [
    ShoplistComponent,
    ShopSearchComponent,
    ShopMsiteComponent,
    ShopEvaluateComponent,
    RatingStarComponent,
    LoadingComponent,
    ElmSvgComponent,
    BuyCartComponent
  ],
  entryComponents: []
})
export class ComponentsModule {}