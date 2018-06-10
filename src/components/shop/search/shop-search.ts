import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImgBaseUrl } from '../../../environments/env';

@Component({
  selector: 'shop-search',
  templateUrl: 'shop-search.html'
})
export class ShopSearchComponent {
  @Input() shop: any;
  imgBaseUrl = ImgBaseUrl;
  constructor(public navCtrl: NavController) {

  }
}
