import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    SharedModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
