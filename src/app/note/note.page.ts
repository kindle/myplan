import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, Style } from '@capacitor/status-bar';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  note = {id:-1, date:new Date().getTime(),title:'',content:''};

  constructor(
    private router: Router,
    private data: DataService,
    private ui: UiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //this.ui.setStatusBar(Style.Dark, Animation.Slide, "#3880ff");

    let noteId = this.activatedRoute.snapshot.queryParams["nid"];
    
    if(noteId!=null){//edit note
      this.note = this.data.getNote(noteId);
    }
  }
  ionViewWillLeave() {
    //this.ui.setStatusBar(Style.Light, Animation.Slide, "#ffffff");
  }

  close(){
    if(this.note.title.length==0&&this.note.content.length==0){
      //go to tab4 do not save
    }
    else{
      //save first
      if(this.note.id<0){//new target
        this.data.addNote(
          this.note.date, 
          this.note.title, 
          this.note.content,
        );
      }else{//edit target
        this.data.updateNote(this.note);
      }
    }
    this.router.navigate(['/tabs/tab4'], {});
  }

}
