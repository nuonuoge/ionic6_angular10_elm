import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService, AppService, TabsService} from '../../../service';
import { Tabs } from '../../../class/tabs';
@IonicPage()
@Component({
  selector: 'page-search-address',
  templateUrl: 'search-address.html'
})
export class SearchAddressPage extends Tabs {
  searchData: any;
  searchValue: string = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public tabsService: TabsService,
    public appService: AppService,
    public dataService: DataService) {
    super(tabsService);
  }

  searchPlace() {
    if (this.searchValue) {
      this.dataService.searchNearby(this.searchValue).subscribe(res => {
        this.searchData = res;
      });
    }
  }
  choooedAddress(item: any) {
    this.appService.searchAddress = item;
    this.navCtrl.pop();
  }
}