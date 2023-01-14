import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Animation, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';
import { UiService } from '../ui.service';
import { DataService } from '../data.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private ui: UiService,
    public router:  Router,
    public data: DataService,
  ) {
    this.data.get('target-display').then(value=>{
      this.isList = value;
    });
  }
  
  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Light,Animation.Slide,"#ffffff");
  }

  isList = true;
  toggleListGrid(){
    this.isList=!this.isList;
    this.data.set('target-display', this.isList);
    this.segment=0;
  }

  getTargetType(){
    return this.data.targetType;
  }

  getTopData(){
    return this.data.targetData.filter(d=>{return d.isTop});
  }

  getOrderByTopData(){
    return this.data.targetData.sort((a,b)=>{return (b.isTop?1:0)- (a.isTop?1:0);});
  }

  getData(groupId:number){
    return this.data.targetData.filter(d=>{return !d.isTop && d.type==groupId});
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if(event.target.scrollTop==0){
      this.enableRefresher = true;
    }
    else{
      this.enableRefresher = false;
    }
    
  }

  enableRefresher = true;
  dragDown(event) {
    event.target.complete();
    if(this.enableRefresher){
      this.router.navigate(['/target'], {});  
    }
  }

  goTargetViewer(target){
    this.router.navigate(['/target-viewer'], {
      queryParams: {
        tid:target.id
      }
    });
  }

  @ViewChild(IonSlides) slides: IonSlides;
  
  onSlideDidChange(){
    this.slides.getActiveIndex().then(index=>{
      this.segment = index;
    });
  }

  segment = 0;
  toggleSegment(){
    this.segment=this.segment==0?1:0;
    this.slides.slideTo(this.segment);this.slides.slideTo(this.segment);
  }


}
