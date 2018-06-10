import { Injectable } from '@angular/core';

@Injectable()

export class AppService {
  geohash: string = '';
  shopId: string = '';
  searchAddress: any;
  choosedAddress: {address: string, index: number} = {address: '', index: 0};
  confirmRemark: {remarkText: string, inputText: string} = {remarkText: '', inputText: ''};

  getTabPagesIndex(pageName) {
    let tabPagesIndex: any = {'MsitePage': 0, 'SearchPage': 1, 'OrderPage': 2, 'ProfilePage': 3};
    return tabPagesIndex[pageName];
  }
}