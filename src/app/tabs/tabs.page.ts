import { Component, AfterViewInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements AfterViewInit {
  constructor() {
  }


  ngAfterViewInit() {
    Observable.create((observer: any) => {
      let clearInter = setInterval(() => {
        let ionTabElm = document.querySelector('ion-tabs');
        if (ionTabElm) {
          clearInterval(clearInter);
          observer.next(ionTabElm);
        }
      }, 200);
    })
    .pipe(
      flatMap((ionTabElm: Element) => {
        return Observable.create((observer: any) => {
          let clearInter = setInterval(() => {
            let ionTabbarElm = ionTabElm.shadowRoot.querySelector('ion-tabbar');
            if (ionTabbarElm) {
              clearInterval(clearInter);
              observer.next(ionTabbarElm);
            }
          }, 200);
        });
      }),
      flatMap((ionTabElm: Element) => {
        return Observable.create((observer: any) => {
          let clearInter = setInterval(() => {
            let tabButtonElms = ionTabElm.shadowRoot.querySelectorAll('ion-tab-button');
            if (tabButtonElms) {
              clearInterval(clearInter);
              observer.next(tabButtonElms);
            }
          }, 200);
        });
      }),
      flatMap((tabButtonElms: NodeList) => {
        return from([tabButtonElms[0], tabButtonElms[1], tabButtonElms[2], tabButtonElms[3]]);
      }),
      flatMap((tabButtonElm: Element) => {
        return Observable.create((observer: any) => {
          let clearInter = setInterval(() => {
            let style = document.createElement('style');
            style.innerHTML = '.icon { font-size: 20px; margin-top: 8px; }';
            tabButtonElm.shadowRoot.appendChild(style);
            let ionElm = tabButtonElm.shadowRoot.querySelector('ion-icon');
            if (ionElm) {
              clearInterval(clearInter);
              observer.next(ionElm);
            }
          }, 200);
        });
      }),
      map((ionElm: Element) => {
        ionElm.classList.add('icon');
      })
    )
    .subscribe(res => {
    });
  }
}
