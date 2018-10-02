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
            let iconElms = ionTabElm.shadowRoot.querySelectorAll('ion-icon');
            if (iconElms) {
              clearInterval(clearInter);
              observer.next(iconElms);
            }
          }, 200);
        });
      }),
      map((iconElms: NodeList) => {
        Array.from(iconElms).forEach((iconElm:any) => {
          iconElm.style.fontSize = '20px';
          iconElm.style.marginTop = '8px';
        });
      })
    )
    .subscribe(res => {
    });
  }
}
