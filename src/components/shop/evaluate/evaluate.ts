import { Component, Input, NgZone } from '@angular/core';
import { DataService, ShopService } from '../../../service';

@Component({
  selector: 'shop-evaluate',
  templateUrl: 'evaluate.html'
})
export class ShopEvaluateComponent {
  @Input() shopId: string;
  @Input() rating: string;
  ratingList: any; // 评价列表
  ratingOffset: number = 0; // 评价获取数据offset值
  ratingScoresData: any; // 评价总体分数
  showLoading: boolean = false;
  items: any[] = [];
  touchEnd: boolean = false;
  constructor(public dataService: DataService,
    public shopService: ShopService,
    public zone: NgZone) {
    this.ratingList = this.shopService.ratingList;
    this.ratingScoresData = this.shopService.ratingScoresData;
    this.shopService.updateData.subscribe(res => {
      this.ratingList = this.shopService.ratingList;
      this.ratingScoresData = this.shopService.ratingScoresData;
    });
  }
  loaderMore(infiniteScroll: any) {
    this.zone.run(() => {
      this.ratingOffset += 10;
      this.showLoading = true;
      this.dataService.getRatingList(this.shopId, this.ratingOffset).subscribe(res => {
        if (res.length < 10) {
          this.touchEnd = true;
        }
        infiniteScroll.complete();
        this.ratingList = [...this.ratingList, ...res];
      });
    });
  }

  getRatingList(ratingOffset: number, name?: string) {
    this.dataService.getRatingList(this.shopId, ratingOffset, name).subscribe(res => {
      this.ratingList = this.shopService.ratingList;
    });
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
    let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url;
  }
}
