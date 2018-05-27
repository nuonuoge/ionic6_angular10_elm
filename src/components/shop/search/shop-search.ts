import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'shop-search',
  templateUrl: 'shop-search.html'
})
export class ShopSearchComponent {
  @Input() shop: any;
  imgBaseUrl = 'http://cangdu.org:8001/img/';
  constructor(public navCtrl: NavController) {

  }
}
