import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, AppService} from '../../service';

@Component({
  selector: 'page-search-address',
  templateUrl: 'search-address.page.html',
  styleUrls: ['search-address.page.scss']
})
export class SearchAddressPage {
  searchData: any;
  searchValue: string = '';
  constructor(
    public router: Router,
    public appService: AppService,
    public dataService: DataService) {
  }

  searchPlace() {
    if (this.searchValue) {
      this.dataService.searchNearby(this.searchValue).subscribe(res => {
        this.searchData = res;
      });
    }
  }
  choooedAddress(item: any) {
    this.appService.searchAddress = item;
    this.router.navigate(['/address', 'add']);
  }
}
