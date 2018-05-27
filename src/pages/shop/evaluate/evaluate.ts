import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Tabs } from '../../../class/tabs';
import { TabsService } from '../../../service';

@IonicPage()
@Component({
  selector: 'page-shop-evaluate',
  templateUrl: 'evaluate.html'
})
export class ShopEvaluatePage extends Tabs {
  shopId: string;
  rating: string;
  title: string;
  constructor(public navParams: NavParams, public tabsService: TabsService) {
    super(tabsService);
    this.shopId = navParams.get('shopId');
    this.rating = navParams.get('rating');
    this.title = navParams.get('title');
  }
}
