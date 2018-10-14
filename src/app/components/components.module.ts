import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

import { BackHeaderComponent } from './back/back-header';
import { BackIconComponent } from './back/back-icon';
import { BuyCartComponent } from './buy-cart/buy-cart';
import { ElmSvgComponent } from './svg/svg';
import { LoginHeaderComponent } from './login-header/login-header';
import { LoadingComponent } from './loading/loading';
import { RatingStarComponent } from './rating-star/rating-star';
import { ShoplistComponent } from './shop/list/shop-list';
import { ShopSearchComponent } from './shop/search/shop-search';
import { ShopMsiteComponent } from './shop/msite/shop-msite';
import { ShopEvaluateComponent } from './shop/evaluate/evaluate';

// import { DirectivesModule } from '../directives';
const coms: any[] = [
  BackHeaderComponent,
  BackIconComponent,
  BuyCartComponent,
  ElmSvgComponent,
  LoginHeaderComponent,
  LoadingComponent,
  RatingStarComponent,
  ShoplistComponent,
  ShopSearchComponent,
  ShopMsiteComponent,
  ShopEvaluateComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule.forRoot(),
    NgZorroAntdMobileModule
  ],
  declarations: [
    coms
  ],
  exports: [
    coms
  ],
  entryComponents: [],
})
export class ComponentsModule { }
