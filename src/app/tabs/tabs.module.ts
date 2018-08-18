import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { MsitePageModule } from '../msite/msite.module';
import { SearchPageModule } from '../search/search.module';
import { ProfilePageModule } from '../profile/profile.module';
import { OrderPageModule } from '../order/order.module';

@NgModule({
  imports: [
    SharedModule,
    TabsPageRoutingModule,
    MsitePageModule,
    SearchPageModule,
    ProfilePageModule,
    OrderPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
