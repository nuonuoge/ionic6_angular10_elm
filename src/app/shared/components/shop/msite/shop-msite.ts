import { Component, Input } from '@angular/core';
import { ImgBaseUrl } from '../../../../config/env';

@Component({
  selector: 'shop-msite',
  templateUrl: 'shop-msite.html',
  styleUrls: ['shop-msite.scss']
})
export class ShopMsiteComponent {
  distance: number;
  _shop: any;
  @Input()
  set shop(val: any) {
    this._shop = val;
    if (val && val.distance) {
      this.distance = Number(val);
    }
  }
  get shop() {
    return this._shop;
  }
  @Input() geohash: string;
  imgBaseUrl = ImgBaseUrl;

  zhunShi(supports) {
    let zhunStatus;
    if ((supports instanceof Array) && supports.length) {
      supports.forEach(item => {
        if (item.icon_name === '准') {
          zhunStatus = true;
        }
      });
    } else {
      zhunStatus = false;
    }
    return zhunStatus;
  }
}
