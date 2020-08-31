import { Component, OnInit } from '@angular/core';
import { DataService } from '../service';

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
  hotcity = 'hotcity';

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
      try {
        this.hotcity = JSON.stringify(res);
      } catch (error) {
        this.hotcity = 'json err hotcity';
      }
      if (Array.isArray(res)) {
        this.hotCities = res.map((city) => {
          return { name: city.name , id: city.id };
        });
      }
    }, err => {
      this.hotCities = [];
      try {
        this.hotcity = JSON.stringify(err);
      } catch (error) {
        this.hotcity = 'jsonerr err hotcity';
      }
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
