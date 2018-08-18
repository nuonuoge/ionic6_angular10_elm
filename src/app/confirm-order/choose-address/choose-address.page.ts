import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService, DataService, LocalStorageService, CartService, ShopService } from '../../service';
import { UserInfo } from '../../class';

@Component({
  selector: 'page-choose-address',
  templateUrl: 'choose-address.page.html',
  styleUrls: ['choose-address.page.scss']
})
export class ChooseAddressPage extends UserInfo implements OnInit, OnDestroy {
  addressList: any[];
  deliverable: any[];
  deliverdisable: any[];
  iconColor: any = {'公司': '#4cd964', '学校': '#3190e8', '家': '#ff5722'};
  unSub: Subscription;
  constructor(
    public appService: AppService,
    public localStorageService: LocalStorageService,
    public cartService: CartService,
    public shopService: ShopService,
    public dataService: DataService) {
    super(appService, localStorageService);
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
    window.history.back();
  }

  ngOndestory() {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
