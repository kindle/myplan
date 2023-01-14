import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, StatusBar, Style } from '@capacitor/status-bar';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(
    private ui: UiService,
    public router:  Router,
    private data: DataService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Light,Animation.Slide,"#ffffff");
  }


  //test only 
  resetData(){
    this.data.clearData();
    this.data.initData();
    alert('reset successfully!')
  }

  //test only
  printData(){
    console.log(this.data.group);
    console.log(this.data.targetData)
  }

  howToDoBetter(){

  }

  goSettings(){
    
  }

  goTutorial(){
    this.router.navigate(['/tutorial'], {
      queryParams: {
      }
    });
  }

  goHistory(){
    this.router.navigate(['/history-today'], {
      queryParams: {
      }
    });
  }
}
