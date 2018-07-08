import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsService } from '../../service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabMsiteRoot = 'MsitePage';
  tabSearchRoot = 'SearchPage';
  tabOrderRoot = 'OrderPage';
  tabProfileRoot = 'ProfilePage';
  tabPages = ['MsitePage', 'SearchPage', 'OrderPage', 'ProfilePage'];
  geohashParams: any;
  hideTabs: boolean;
  selectedIndex: number;

  constructor(public tabsService: TabsService,
              public navCtrl: NavController,
              public appCtrl: App,
              public navParams: NavParams) {
    this.hideTabs = false;
    this.tabsService.tabsEvent.subscribe(res => {
      this.hideTabs = res;
    });
    const pageName = navParams.get('pageName');
    this.geohashParams = {geohash: navParams.get('geohash')};
    this.selectedIndex = this.getPageIndex(pageName);
  }

  getPageIndex(pageName: string) {
    return this.tabPages.findIndex((item: any, index) => {
      return item === pageName;
    });
  }
}
