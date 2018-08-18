import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, DataService, LocalStorageService } from '../../service';
import { ImgBaseUrl } from '../../config/env';
import { UserInfo } from '../../class';

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.page.html',
  styleUrls: ['order-detail.page.scss']
})
export class OrderDetailPage extends UserInfo implements OnInit {
  orderData: any;
  orderDetail: any;
  showLoading: boolean = true;
  imgBaseUrl: string = ImgBaseUrl;
  shopId: string;
  params: {geohash: string};
  constructor(public router: Router,
    public appService: AppService,
    public dataService: DataService,
    public localStorageService: LocalStorageService) {
      super(appService, localStorageService);
  }

  ngOnInit() {
    this.shopId = this.appService.orderDetail.restaurant_id;
    this.params = { geohash: this.appService.geohash };
    this.orderDetail = this.appService.orderDetail;
    if (this.userId && this.appService.orderDetail) {
      this.dataService.getOrderDetail(this.userId, this.appService.orderDetail.unique_id).subscribe(res => {
        this.orderData = res;
        this.showLoading = false;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

}
