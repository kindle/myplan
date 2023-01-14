import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Animation, Style } from '@capacitor/status-bar';
import { InfiniteScrollCustomEvent } from '@ionic/core';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-target-viewer',
  templateUrl: './target-viewer.page.html',
  styleUrls: ['./target-viewer.page.scss'],
})
export class TargetViewerPage implements OnInit {

  constructor(
    private ui: UiService,
    public data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {}

  currentTarget;
  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Dark,Animation.Slide,"#3880ff");

    let targetId = this.activatedRoute.snapshot.queryParams["tid"];

    this.currentTarget = this.data.getTarget(targetId);
    let curTargetIndex = this.data.targetData.indexOf(this.currentTarget);
    this.slides.slideTo(curTargetIndex, 0);
    
    
    this.data.globalCurrentTargetGroup = this.data.getGroup(this.currentTarget.groupId);
  }


  @ViewChild(IonSlides) slides: IonSlides;
  onTargetSlideDidChange(){
    this.slides.getActiveIndex().then(index=>{
      //this.currentTarget = this.data.targetData[index];
      
    });
  }


  onIonInfinite(ev) {
    //this.generateBigDays();
    /*setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);*/
  }

  editTarget(){
    this.router.navigate(['/target'], {
      queryParams: {tid:this.currentTarget.id}
    });
  }


  showBgSettings=false;
  toggleShowBgSettings(event){
    this.showBgSettings=!this.showBgSettings;

    event.preventDefault();
    event.stopPropagation();
  }
  hideShowBgSettings(){
    this.showBgSettings=false;
  }

  fontType;
  chooseFont(t){
    this.fontType=t;
  }

  closeBg(){
    this.showBgSettings=false;
  }

  goImageAdjust(){
    this.router.navigate(['/image-adjust'], {
      queryParams: {tid:this.currentTarget.id}
    });
  }
}
