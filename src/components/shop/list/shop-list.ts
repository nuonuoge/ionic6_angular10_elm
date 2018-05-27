import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'shop-list',
  templateUrl: 'shop-list.html'
})
export class ShoplistComponent {
  @Input() shopList: any;
  @Input() type: string;
  @Input() geohash: string;
  touchend: boolean;
  showBackStatus: string;
  constructor(public navCtrl: NavController) {
  }
}
