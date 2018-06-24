import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, DataService, LocalStorageService, TabsService, CartService, ShopService } from '../../../service';
import { UserInfoTabs } from '../../../class';
@IonicPage()
@Component({
  selector: 'page-choose-address',
  templateUrl: 'choose-address.html'
})
export class ChooseAddressPage extends UserInfoTabs implements OnInit, OnDestroy {
  addressList: any[];
  deliverable: any[];
  deliverdisable: any[];
  iconColor: any = {'公司': '#4cd964', '学校': '#3190e8', '家': '#ff5722'};
  unSub: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public tabsService: TabsService,
    public localStorageService: LocalStorageService,
    public cartService: CartService,
    public shopService: ShopService,
    public dataService: DataService) {
    super(appService, localStorageService, tabsService);
    this.unSub = this.appService.notify.subscribe(res => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.addressList = [];
    this.deliverable = [];
    this.deliverdisable = [];
    if (this.userId) {
      this.dataService.getAddressList(this.userId).subscribe(res => {
        this.addressList = res;
        this.addressList.forEach(item => {
          if (item.is_deliverable) {
            this.deliverable.push(item);
          } else {
            this.deliverdisable.push(item);
          }
        });
        this.setFirstIndex();
      });
    }
  }
  setFirstIndex() {
    if (this.deliverable.length === 1) {
      this.appService.choosedAddress = {address: this.deliverable[0], index: 0};
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

  ngOndestory() {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}