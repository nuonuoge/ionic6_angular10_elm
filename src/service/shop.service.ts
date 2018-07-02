import { EventEmitter, Injectable } from '@angular/core';

@Injectable()

export class ShopService {
  shopDetailData: any;
  ratingScoresData: any;
  ratingList: any;
  updateData: EventEmitter<any> = new EventEmitter();
  loaderMoreRatings: EventEmitter<any> = new EventEmitter();

  setShopDetailData(data: any) {
    this.shopDetailData = data;
    this.updateData.emit('update');
  }

  setRatingScoresData(data: any) {
    this.ratingScoresData = data;
    this.updateData.emit('update');
  }

  setRatingList(data: any) {
    this.ratingList = data;
    this.updateData.emit('update');
  }
}