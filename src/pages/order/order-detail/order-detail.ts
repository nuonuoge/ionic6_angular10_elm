import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AppService, DataService, LocalStorageService, TabsService } from '../../../service';
import { ImgBaseUrl } from '../../../environments/env';
import { UserInfoTabs } from '../../../class';

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage extends UserInfoTabs implements OnInit {
  orderData: any;
  orderDetail: any;
  showLoading: boolean = true;
  imgBaseUrl: string = ImgBaseUrl;
  params: {geohash: string, id: string};
  constructor(public appService: AppService,
    public dataService: DataService,
    public localStorageService: LocalStorageService,
    public tabsService: TabsService,
    public navCtrl: NavController) {
      super(appService, localStorageService, tabsService);
  }

  ngOnInit() {
    this.params = { geohash: this.appService.geohash, id: this.appService.orderDetail.restaurant_id };
    this.orderDetail = this.appService.orderDetail;
    if (this.userId && this.appService.orderDetail) {
      this.dataService.getOrderDetail(this.userId, this.appService.orderDetail.unique_id).subscribe(res => {
        this.orderData = res;
        this.showLoading = false;
      });
    } else {
      this.navCtrl.push('LoginPage');
    }
  }

}
