import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class TabsService {
    tabsEvent: EventEmitter<boolean> = new EventEmitter();

    hideTabs() {
        this.tabsEvent.emit(true);
    }

    showTabs() {
        this.tabsEvent.emit(false);
    }
}