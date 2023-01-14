import { Component, Optional } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  @Optional() private routerOutlet?: IonRouterOutlet

  constructor(
    private platform: Platform,
    private storage: Storage,
    private data: DataService,
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      window.history.back();
    });

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.routerOutlet&&!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });

    //init localstorage
    this.storage.create().then(()=>{
      //load local storage groups/targets
      //calculate targets days/target count in groups
      this.data.init();
    })
  }

  async ngOnInit() {
  }
}
