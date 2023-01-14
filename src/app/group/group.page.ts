import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, Style } from '@capacitor/status-bar';
import { NavController } from '@ionic/angular';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  constructor(
    private ui: UiService,
    public data: DataService,
    private nav: NavController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  group = {
    id:0, 
    name: "", 
    icon:"", 
    cover:"", 
    count:0
  };

  
  iconExpanded=false;
  iconGroupChange(){
    this.iconExpanded=!this.iconExpanded;
  }
  coverExpanded=false;
  coverGroupChange(){
    this.coverExpanded=!this.coverExpanded;
  }
  
  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Dark, Animation.Slide, "#3880ff");

    let groupId = this.activatedRoute.snapshot.queryParams["gid"];
    if(groupId!=null){//edit group
      this.group = this.data.getGroup(groupId);
    }
  }
  ionViewWillLeave() {
    this.ui.setStatusBar(Style.Light, Animation.Slide, "#ffffff");
  }

  save(){
    this.group.name = this.group.name.trim();
    if(this.group.name.length==0){
      this.ui.toast('middle','请输入分组名称');
    }
    else if(this.group.icon.length==0){
      this.ui.toast('middle','请选择分组图标');
    }
    else if(this.group.cover.length==0){
      this.ui.toast('middle','请选择封面图标');
    }
    else{
      if(this.group.id==0){
        this.data.addGroup({
          id:0, 
          name: this.group.name, 
          icon:this.group.icon, 
          cover:this.group.cover, 
          count:this.group.count
        });
        /*this.router.navigate(['/tabs/tab2'], {
        });*/
      }else{
        this.data.updateGroup(this.group);
      }

      
      //this.nav.back();
      this.router.navigate(['/tabs/tab2'], {});
    }
  }

  chooseIcon(name:string){
    this.group.icon=name;
  }

  chooseCover(name:string){
    this.group.cover=name;
  }
}
