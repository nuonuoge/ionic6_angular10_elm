import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, DataService, LocalStorageService, TabsService, CartService, ShopService } from '../../../service';
import { Tabs } from '../../../class/tabs';
@IonicPage()
@Component({
  selector: 'page-choose-address',
  templateUrl: 'choose-address.html'
})
export class ChooseAddressPage extends Tabs implements OnInit {
  addressList: any[];
  deliverable: any[];
  deliverdisable: any[];
  iconColor: any = {'公司': '#4cd964', '学校': '#3190e8', '家': '#ff5722'};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public tabsService: TabsService,
    public localStorageService: LocalStorageService,
    public cartService: CartService,
    public shopService: ShopService,
    public dataService: DataService) {
    super(tabsService);
  }

  ngOnInit() {
    this.addressList = [];
    this.deliverable = [];
    this.deliverdisable = [];
    let userId = this.localStorageService.getStore('userId');
    if (userId) {
      this.dataService.getAddressList(userId).subscribe(res => {
        this.addressList = res;
        this.addressList.forEach(item => {
          if (item.is_deliverable) {
            this.deliverable.push(item);
          } else {
            this.deliverdisable.push(item);
          }
        });
      });
    }
  }
  defaultIndex() {
    if (this.appService.choosedAddress.index) {
      return this.appService.choosedAddress.index;
    } else {
      return 0;
    }
  }
  chooseAddress(address, index) {
    this.appService.choosedAddress = {address, index};
    this.navCtrl.pop();
  }
}