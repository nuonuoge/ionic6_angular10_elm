import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'shop-msite',
  templateUrl: 'shop-msite.html'
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
  imgBaseUrl = 'http://cangdu.org:8001/img/';
  constructor(public navCtrl: NavController) {

  }

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
