import { Component, OnInit, ViewChild } from '@angular/core';
import { Animation, Style } from '@capacitor/status-bar';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-history-today',
  templateUrl: './history-today.page.html',
  styleUrls: ['./history-today.page.scss'],
})
export class HistoryTodayPage implements OnInit {

  todayCard;

  constructor(
    private data: DataService,
    private ui: UiService,
  ) { 
    let eventDate = this.data.getLocalISOString(new Date());
    this.todayCard = Array.from(eventDate.split('T')[0]);

  }

  ngOnInit() {
  }

  historyToday;
  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Light,Animation.Slide,"#ffffff");

    let month = this.todayCard[5]+this.todayCard[6];//e.g.:"01"
    let date = month+this.todayCard[8]+this.todayCard[9];//e.g.:"0101"

    //test
    //month="12"
    //date="1204"

    this.data.getTodayHistory(month).then((result) => {
      this.historyToday=result.filter(r=>r.key==date)
        .sort((a,b)=> a.type.localeCompare(b.type));
    });
  }


  share(){
    const historyBlock = document.getElementById("print-wrapper-history");
    
    const options = { 
      background: "white", 
      width: historyBlock.clientWidth, 
      height: historyBlock.clientHeight 
    };
    
    domtoimage.toPng(historyBlock, options).then((hisDataUrl) => {
      var hisImage = new Image();
      hisImage.src = hisDataUrl;

      this.initCanvas(hisImage,options.width,options.height);
      //this.ui.share(dataUrl);
    });

  }

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
      ctx.strokeText('历史上的今天', canvas.width/2, 40);
      ctx.fillText("历史上的今天", canvas.width/2, 40);

      let dataUrl=canvas.toDataURL();
      console.log(dataUrl);

      var img1 = new Image();
      img1.src = dataUrl;
      //document.body.appendChild(img1);

      this.ui.share(dataUrl);
    }

  }

}
