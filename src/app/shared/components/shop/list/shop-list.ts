import { Component, Input, OnInit } from '@angular/core';
import { list } from "./data";
@Component({
  selector: 'shop-list',
  templateUrl: 'shop-list.html'
})
export class ShoplistComponent implements OnInit {
  @Input() shopList: any;
  @Input() type: string;
  @Input() geohash: string;
  touchend: boolean;
  showBackStatus: string;
  list = list;
  constructor() {
  }
  name=['低合金卷Q345B','三级抗震螺纹钢','高线HPB300','三级抗震螺','花纹卷HQ235B','镀锌板','普板','碳结板'
  ,'耐磨板','H型管','工字钢','槽钢','等边角钢','零割板','钢带','槽钢','等边角钢','耐磨板','H型管','工字钢','槽钢','等边角钢'];
  ngOnInit(): void {
    console.log('shopList', this.list,this.list.length);
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      element.name=this.name[index];
      
    }
  }
}
