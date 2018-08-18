import { Component, Input } from '@angular/core';
import { ImgBaseUrl } from '../../../config/env';

@Component({
  selector: 'shop-search',
  templateUrl: 'shop-search.html',
  styleUrls: ['shop-search.scss']
})
export class ShopSearchComponent {
  @Input() shop: any;
  imgBaseUrl = ImgBaseUrl;
  constructor() {
  }
}
