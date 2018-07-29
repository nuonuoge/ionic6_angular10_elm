import { TabsService } from '../service';
export class Tabs {
  constructor(public tabsService: TabsService) {}
  ionViewWillEnter() {
    this.tabsService.hideTabs();
  }
  ionViewWillLeave() {
    this.tabsService.showTabs();
  }
}
