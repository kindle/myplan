import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, Style } from '@capacitor/status-bar';
import { ItemReorderEventDetail } from '@ionic/core';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public ui: UiService,
    public data: DataService,
    private router: Router,
  ) { 
  }

  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Light,Animation.Slide,"#ffffff");
    this.data.calGroup();
  }

  ionViewWillLeave() {
    this.isDisabled = true;
  }
  
  goGroupViewer(group){
    this.router.navigate(['/group-viewer'], {
      queryParams: {gid:group.id}
    });
  }

  deleteGroup(event, group){
    this.ui.confirm("删除分组","确定要删除？",()=>{
      //this.data.deleteTarget(this.target.id);
    })
    //分组里有目标，确定要删除？
    //最后一个分组不能删除

    event.preventDefault();
    event.stopPropagation();
  }

  setTop(event, group){
    this.data.setTop(group);

    event.preventDefault();
    event.stopPropagation();
  }


  ////reorder
  public isDisabled = true;
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    this.data.group = ev.detail.complete(this.data.group);
  }

  toggleReorder() {
    this.isDisabled = !this.isDisabled;
  }


  dragDown(event){
    event.target.complete();
    this.router.navigate(['/group'], {});  
  }

}
