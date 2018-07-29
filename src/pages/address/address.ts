import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { AppService, DataService, LocalStorageService, TabsService } from '../../service';
import { UserInfoTabs } from '../../class';
@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html'
})
export class AddressPage extends UserInfoTabs implements OnInit, OnDestroy {
  addressList: any[];
  iconColor: any = {'公司': '#4cd964', '学校': '#3190e8', '家': '#ff5722'};
  unSub: Subscription;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public tabsService: TabsService,
    public localStorageService: LocalStorageService,
    public dataService: DataService) {
    super(appService, localStorageService, tabsService);
    this.unSub = this.appService.notify.subscribe(res => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.addressList = [];
    if (this.userId) {
      this.dataService.getAddressList(this.userId).subscribe(res => {
        this.addressList = res;
      });
    }
  }

  ngOndestory() {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
