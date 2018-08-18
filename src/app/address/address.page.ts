import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService, DataService, LocalStorageService } from '../service';
import { UserInfo } from '../class';
@Component({
  selector: 'page-address',
  templateUrl: 'address.page.html',
  styleUrls: ['address.page.scss']
})
export class AddressPage extends UserInfo implements OnInit, OnDestroy {
  addressList: any[];
  iconColor: any = {'公司': '#4cd964', '学校': '#3190e8', '家': '#ff5722'};
  constructor(
    public appService: AppService,
    public localStorageService: LocalStorageService,
    public dataService: DataService) {
    super(appService, localStorageService);
  }

  ngOnInit() {
    this.addressList = [];
    if (this.userId) {
      this.dataService.getAddressList(this.userId).subscribe(res => {
        this.addressList = res;
      });
    }
  }
}
