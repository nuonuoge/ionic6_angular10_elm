import { Component, OnInit } from '@angular/core';
import { DataService } from '../service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {
  guessCity: string;
  guessCityId: string;
  hotCities: any[];
  groupCities: any;
  constructor(public dataService: DataService) {
    this.guessCity = '';
    this.hotCities = [];
  }

  ngOnInit() {
    this.getCurrentCity();
    this.getHotCity();
    this.getGroupCity();
  }

  getCurrentCity() {
    this.dataService.getGuessCity().subscribe(res => {
      this.guessCity = res.name;
      this.guessCityId = res.id;
    }, err => {
      this.guessCity = '无数据';
      this.guessCityId = '';
    });
  }

  getHotCity() {
    this.dataService.getHotCity().subscribe(res => {
      if (Array.isArray(res)) {
        this.hotCities = res.map((city) => {
          return { name: city.name, id: city.id };
        });
      }
    }, err => {
      this.hotCities = [];
    });
  }

  getGroupCity() {
    this.dataService.getGroupCity().subscribe(res => {
      this.groupCities = res;
    }, err => {
      this.groupCities = [];
    });
  }
}
