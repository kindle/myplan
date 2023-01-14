import { Component, OnInit } from '@angular/core';
import { Animation, Style } from '@capacitor/status-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-group-viewer',
  templateUrl: './group-viewer.page.html',
  styleUrls: ['./group-viewer.page.scss'],
})
export class GroupViewerPage implements OnInit {

  constructor(
    private ui: UiService,
    public data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  )
 { }

  ngOnInit() {
  }


  currentGroup;
  targets;
  ionViewWillEnter() {
    this.ui.setStatusBar(Style.Dark,Animation.Slide,"#3880ff");

    let groupId = this.activatedRoute.snapshot.queryParams["gid"];
    this.currentGroup = this.data.getGroup(groupId);

    this.targets = this.data.getTargets(groupId);
  }


  goTargetViewer(target){
    this.router.navigate(['/target-viewer'], {
      queryParams: {tid:target.id}
    });
  }

  addTarget(){
    this.data.globalCurrentTargetGroup = this.currentGroup;
    this.router.navigate(['/target'], {});
  }

  editGroup(){
    this.router.navigate(['/group'], {
      queryParams: {gid:this.currentGroup.id}
    });
  }
}
