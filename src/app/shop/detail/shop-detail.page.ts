import { Component } from '@angular/core';
import { ShopService } from '../../service';
import { ImgBaseUrl } from '../../config/env';

@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.page.html',
  styleUrls: ['shop-detail.page.scss']
})
export class ShopDetailPage {
  shopDetailData: any;
  ratingScoresData: any;
  rating: any;
  imgBaseUrl: string = ImgBaseUrl;
  ratingParams: any;
  constructor(public shopService: ShopService) {
    this.shopDetailData = this.shopService.shopDetailData;
    this.ratingScoresData = this.shopService.ratingScoresData;
    this.rating = this.shopService.ratingList[0];
    this.ratingParams = {rating: this.shopDetailData.rating, title: this.shopDetailData.name};
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
}
