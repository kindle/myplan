import { Component } from '@angular/core';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public uiService: UiService) {}

  curTab = "tab1"
  ionTabsDidChange(event){
    this.curTab = event.tab;
  }
}
