import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ShopService, TabsService } from '../../../service';
import { Tabs } from '../../../class/tabs';

@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html'
})
export class ShopDetailPage extends Tabs {
  shopDetailData: any;
  ratingScoresData: any;
  rating: any;
  imgBaseUrl: string = 'http://cangdu.org:8001/img/';
  ratingParams: any;
  constructor(public navCtrl: NavController, public shopService: ShopService, public tabsService: TabsService) {
    super(tabsService);
    this.shopDetailData = this.shopService.shopDetailData;
    this.ratingScoresData = this.shopService.ratingScoresData;
    this.rating = this.shopService.ratingList[0];
    this.ratingParams = {shopId: this.shopDetailData.id, rating: this.shopDetailData.rating, title: this.shopDetailData.name};
  }

  getImgPath(path) {
    let suffix;
    if (!path) {
      return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg';
    }
    if (path.indexOf('jpeg') !== -1) {
      suffix = '.jpeg';
    } else {
      suffix = '.png';
    }
    const url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url;
  }

  toCityDetail(id: string) {
    this.navCtrl.push('CityPage', {
      id: id
    });
  }
}
