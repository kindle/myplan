import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animation, Style } from '@capacitor/status-bar';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  constructor(
    private ui: UiService,
    private activatedRoute: ActivatedRoute,
    private data: DataService,
  ){}

  ngOnInit() {}
  
  currentTarget;
  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Dark,Animation.Slide,"#3880ff");

    let targetId = this.activatedRoute.snapshot.queryParams["tid"];
    this.currentTarget = this.data.getTarget(targetId);
  }
  
  /*
  initCanvas(){
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = "320";
    this.canvasElement.height = "320";
  }

  setBackground(){
    let background = new Image();
    background.src = './assets/viewer-bg.jpg';
    let ctx = this.canvas.nativeElement.getContext('2d');

    background.onload = () => {
      ctx.drawImage(background,0,0, 320,320);

      ctx.font = "30px Arial";
      ctx.fillText("1024", 10, 50);
    }
  }
  */

  save(){
    //var dataUrl = this.canvasElement.toDataURL();

    //this.ui.saveShareImage(dataUrl);
    this.ui.toast("bottom", "已经保存图片到本地");
  }

  share(){
    const historyBlock = document.getElementById("print-wrapper-prview");
    
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
      this.ui.share(hisDataUrl);
    });
  }

  quote="";

  initCanvas(img,width,height){
    let canvas = document.createElement("canvas");
    canvas.width=width+20;
    //20 margin
    //50 header text
    canvas.height=height+20+50;
  
    let bgImage = new Image();
    bgImage.src = './assets/viewer-bg.jpg';
    let ctx = canvas.getContext('2d');

    bgImage.onload = () => {
      ctx.drawImage(bgImage,0,0, width+20,height+20+50);
      ctx.drawImage(img,10,10+50, width,height);

      ctx.font = "30px Arial";
      ctx.fillStyle = "#B08950";
      ctx.textAlign = "center";
      ctx.font = 'Bold 30px Sans-Serif';
      ctx.strokeText('应用名称·Today', canvas.width/2, 40);
      ctx.fillText("应用名称·Today", canvas.width/2, 40);

      let dataUrl=canvas.toDataURL();
      console.log(dataUrl);

      var img1 = new Image();
      img1.src = dataUrl;
      //document.body.appendChild(img1);

      this.ui.share(dataUrl);
    }

  }

}
