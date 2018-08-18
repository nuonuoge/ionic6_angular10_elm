import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'page-shop-evaluate',
  templateUrl: 'evaluate.page.html'
})
export class ShopEvaluatePage {
  shopId: string;
  rating: string;
  title: string;
  constructor(public route: ActivatedRoute) {
    this.shopId = this.route.snapshot.paramMap.get('id');
    this.rating = this.route.snapshot.queryParamMap.get('rating');
    this.title = this.route.snapshot.queryParamMap.get('title');
  }
}
