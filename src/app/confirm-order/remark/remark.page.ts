import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, DataService, LocalStorageService } from '../../service';

@Component({
  selector: 'page-remark',
  templateUrl: 'remark.page.html',
  styleUrls: ['remark.page.scss']
})
export class RemarkPage  implements OnInit {
  showLoading: boolean = true;
  remarkList: any;
  remarkText: any = {};
  inputText: string = '';
  id: string;
  sig: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public localStorageService: LocalStorageService,
    public appService: AppService,
    public dataService: DataService) {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.sig = this.route.snapshot.queryParamMap.get('sig');
  }

  ngOnInit() {
    this.remarkList = this.dataService.getRemark(this.id, this.sig).subscribe(res => {
      this.remarkList = res;
      this.showLoading = false;
    });
  }

  chooseRemark(index: number, remarkIndex: string, text: string) {
    this.remarkText[index] = [remarkIndex, text];
    this.remarkText = Object.assign({}, this.remarkText);
  }

  confirmRemark() {
    this.appService.confirmRemark = { remarkText: this.remarkText, inputText: this.inputText };
    window.history.back();
  }
}
