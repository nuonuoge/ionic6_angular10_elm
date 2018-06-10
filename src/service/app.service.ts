import { Injectable } from '@angular/core';

@Injectable()

export class AppService {
  geohash: string = '';
  shopId: string = '';
  searchAddress: any;
  choosedAddress: {address: string, index: number} = {address: '', index: 0};
  confirmRemark: {remarkText: string, inputText: string} = {remarkText: '', inputText: ''};
}