import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, Style } from '@capacitor/status-bar';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    public data: DataService,
    private ui: UiService,
    private router: Router,
  ) { 
  }

  ngOnInit() {
    //this.data.noteData=[];
    //this.data.saveNote();
  }

  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Light,Animation.Slide,"#ffffff");
  }

  ionViewWillLeave() {
    this.canSelect=false;
  }

  getOrderNotes(){
    return this.data.noteData.sort((a,b)=>{return b.date-a.date;});
  }

  goNote(note){
    if(!this.canSelect){
      this.router.navigate(['/note'], {
        queryParams: {
          nid:note.id
        }
      });
    }
  }

  canSelect=false;
  opt(){
    this.canSelect = !this.canSelect;
  }
}
