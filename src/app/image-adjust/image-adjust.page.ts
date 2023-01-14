import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Animation, Style } from '@capacitor/status-bar';
import { DataService } from '../data.service';
import { UiService } from '../ui.service'
import * as PinchZoomCanvas from "../../assets/js/pinch-zoom-canvas.js"

import domtoimage from 'dom-to-image';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-image-adjust',
  templateUrl: './image-adjust.page.html',
  styleUrls: ['./image-adjust.page.scss'],
})
export class ImageAdjustPage implements OnInit {

  constructor(
    private ui: UiService,
    public data: DataService,
    private activatedRoute: ActivatedRoute,
    private nav: NavController,
  ) {}

  ngOnInit() {
  }

  currentTarget;
  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Dark,Animation.Slide,"#3880ff");

    let targetId = this.activatedRoute.snapshot.queryParams["tid"];
    this.currentTarget = this.data.getTarget(targetId);

    let options = {
      canvas: document.getElementById('mycanvas'),
      path: "./assets/adbg.png", 
      momentum: true,
      onZoomEnd: (zoom, zoomed)=> {},
      onZoom: (zoom)=> {}
    };
    new PinchZoomCanvas(options);
  }

  blur=0;

  fontColor="black";
  fontChange(event){
    this.fontColor = event.detail.value;
  }
  
  complete(){
    const historyBlock = document.getElementById("mycanvas");
    
    const options = { 
      background: "white", 
      width: historyBlock.clientWidth, 
      height: historyBlock.clientHeight 
    };
    
    domtoimage.toPng(historyBlock, options).then((hisDataUrl) => {
      /*
      //test
      var hisImage = new Image();
      hisImage.src = hisDataUrl;
      document.body.appendChild(hisImage);
      */
      this.currentTarget.dataUrl = hisDataUrl;

      console.log(this.currentTarget)

      this.nav.back();
    });


  }
}
